# Pura — Backend Documentation Pack (Part 3 of 4)
## Auth · Validation · Business Logic · Error Handling · Response Standards

---

# 10. Authentication and Authorization Plan

## Approach: JWT-Based Stateless Auth

**Why JWT?** The frontend is a SPA (Next.js client-side). JWT tokens let the frontend store the token and send it with every request without server-side session management. This is simpler for a team new to backend.

## Flow

1. **Signup** → User sends `{email, password, fullName, phone}` → Server hashes password with BCrypt, creates user, returns JWT
2. **Login** → User sends `{email, password}` → Server verifies, returns `{token, refreshToken, user}`
3. **Authenticated requests** → Frontend sends `Authorization: Bearer <token>` header
4. **Token refresh** → When access token expires (30 min), frontend sends refresh token to get a new one
5. **Logout** → Frontend discards tokens. Optionally server blacklists refresh token

## Token Structure

```
Access Token: short-lived (30 minutes)
Refresh Token: long-lived (7 days)
```

## Password Storage

- Use `BCryptPasswordEncoder` (built into Spring Security)
- Never store plain passwords
- Salt is built into BCrypt automatically

## Public vs Protected Routes

| Route Pattern | Auth Required? |
|---|---|
| `POST /api/auth/*` | No |
| `GET /api/products/**` | No |
| `GET /api/subscription-plans` | No |
| `GET /api/cart/**` | Yes |
| `POST /api/cart/**` | Yes |
| `POST/GET /api/orders/**` | Yes |
| `POST/GET /api/subscriptions/**` (user) | Yes |
| `GET /api/dashboard/**` | Yes |
| `*/api/users/**` | Yes |
| `POST/PUT/DELETE /api/products/**` | Yes (ADMIN only) |

## Roles

| Role | Access |
|---|---|
| USER | All customer-facing APIs |
| ADMIN | Product CRUD, all user management (Phase 2) |

## Spring Security Implementation Notes

```java
// SecurityConfig.java — key points:
// 1. Disable CSRF (stateless JWT)
// 2. Set session management to STATELESS
// 3. Add JwtAuthenticationFilter before UsernamePasswordAuthenticationFilter
// 4. Configure public/protected routes
// 5. Enable CORS for frontend origin
```

## Frontend Integration

- After login, store token in `localStorage` or `httpOnly cookie`
- Add `Authorization: Bearer <token>` to all fetch calls
- On 401 response, redirect to login or try refresh token
- On 403 response, show "access denied"

---

# 11. Validation Rules

## Auth Module

| Field | Rule | Annotation |
|---|---|---|
| email | Required, valid format | `@NotBlank`, `@Email` |
| password | Required, min 8 chars | `@NotBlank`, `@Size(min=8)` |
| fullName | Required, max 100 | `@NotBlank`, `@Size(max=100)` |
| phone | Optional, 10-15 digits pattern | `@Pattern(regexp="^\\+?[0-9]{10,15}$")` |

## Product Module (Admin)

| Field | Rule |
|---|---|
| name | Required, max 100 |
| category | Required, must be valid enum |
| pricePerUnit | Required, positive integer |
| fatPercentage | Optional, range 0.0–10.0 |
| description | Required |

## Cart Module

| Field | Rule |
|---|---|
| productId | Required, must exist in DB |
| quantity | Required, min 1, max 10 |
| isSubscription | Required boolean |

## Order Module

| Field | Rule |
|---|---|
| addressId | Required, must belong to authenticated user |
| paymentMethod | Required, must be one of: upi, card, netbanking |
| deliveryTime | Required, must be: morning or evening |
| Cart must not be empty | Business validation in service layer |

## Subscription Module

| Field | Rule |
|---|---|
| planId | Required, must exist |
| productId | Required, must exist, must be subscription-eligible |
| quantityLitres | Required, positive, max 5 |
| deliveryTime | Required enum |
| customDays | Required if plan is "custom", values 0-6 |

## Custom Milk Plan Module

| Field | Rule |
|---|---|
| milkType | Required, cow or buffalo |
| fatProfile | Required enum |
| fatPercentage | Required, must fall within fatProfile range |
| quantityLitres | Required, 0.5–5.0 |
| deliveryFrequency | Required enum |
| deliveryTime | Required enum |

## Address Module

| Field | Rule |
|---|---|
| fullName | Required |
| phone | Required, valid pattern |
| addressLine | Required |
| city | Required |
| pincode | Required, 6-digit pattern |

---

# 12. Business Logic Rules

## Cart Total Calculation

```
For each CartItem:
  lineTotal = product.pricePerUnit × cartItem.quantity
  if cartItem.isSubscription:
    lineTotal = lineTotal × 0.95  (5% subscription discount)

subtotal = sum of all lineTotals
deliveryFee = 0 if subtotal >= 200, else 30
total = subtotal + deliveryFee
```

## Order Placement — Step by Step

1. Fetch authenticated user's cart. If empty → error.
2. Validate addressId belongs to user. If not → 403.
3. Create Order with `status=PLACED`, `paymentStatus=PENDING`.
4. For each CartItem, create OrderItem (snapshot product name & price).
5. Calculate totals and save order.
6. Clear the user's cart.
7. Return order confirmation with order number.

## Subscription Creation

1. Validate plan exists and product is subscription-eligible.
2. Create Subscription with `status=ACTIVE`, `startedAt=now`.
3. Generate DeliverySchedules for the next 30 days based on plan frequency.
4. For "custom" plans, only generate schedules for selected days.

## Subscription Pause/Resume

- **Pause**: Set `status=PAUSED`, `pausedAt=now`. Mark upcoming DeliverySchedules as `SKIPPED`.
- **Resume**: Set `status=ACTIVE`, `pausedAt=null`. Regenerate future schedules.

## Custom Milk Plan Pricing

```
Base price per litre by milkType:
  cow = 65
  buffalo = 80

Fat premium (added per litre):
  light = 0
  balanced = 0
  rich = +10
  full-cream = +15

pricePerDelivery = (basePrice + fatPremium) × quantityLitres
```

## Dashboard Summary Derivation

```
deliveriesThisMonth = COUNT(delivery_schedules WHERE month = current AND status IN (CONFIRMED, DELIVERED))
spentThisMonth = SUM(orders.total WHERE month = current AND status != CANCELLED)
activeSubscriptionCount = COUNT(subscriptions WHERE status = ACTIVE)
nextDelivery = FIRST(delivery_schedules WHERE date >= today AND status IN (UPCOMING, CONFIRMED) ORDER BY date ASC)
```

## Product Unavailability

- If `inStock = false`, product should still appear in listings (greyed out) but:
  - Cannot be added to cart → return `400 Bad Request`
  - Cannot start subscription → return `400 Bad Request`

---

# 13. Error Handling Strategy

## GlobalExceptionHandler

Create a `@RestControllerAdvice` class that catches all exceptions and returns consistent error responses.

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    // ResourceNotFoundException → 404
    // ValidationException → 400
    // UnauthorizedException → 401
    // AccessDeniedException → 403
    // BusinessRuleException → 422
    // Generic Exception → 500
}
```

## Standard Error Response

```json
{
  "status": 404,
  "error": "NOT_FOUND",
  "message": "Product with id 'xyz' not found",
  "timestamp": "2025-03-12T10:30:00Z",
  "path": "/api/products/xyz"
}
```

## Validation Error Response (400)

```json
{
  "status": 400,
  "error": "VALIDATION_ERROR",
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "must not be blank" },
    { "field": "quantity", "message": "must be greater than 0" }
  ],
  "timestamp": "2025-03-12T10:30:00Z"
}
```

## Common Error Types

| Exception | HTTP Status | When |
|---|---|---|
| ResourceNotFoundException | 404 | Product/order/user not found |
| ValidationException | 400 | Bean validation failures |
| BusinessRuleException | 422 | Cart empty at checkout, product out of stock |
| UnauthorizedException | 401 | Invalid/expired token |
| AccessDeniedException | 403 | User accessing another user's data |
| DuplicateResourceException | 409 | Email already registered |

---

# 14. API Response Standard

## Single Object

```json
{
  "id": "a2-cow-milk-1l",
  "name": "A2 Cow Milk",
  "category": "fresh-milk"
}
```

Return the object directly — no wrapper for single resources.

## Paginated List

```json
{
  "content": [ ... ],
  "totalElements": 8,
  "totalPages": 1,
  "number": 0,
  "size": 10,
  "first": true,
  "last": true
}
```

Use Spring's built-in `Page<T>` — it serializes to this format automatically.

## Non-Paginated List

Return a plain JSON array `[...]` for small, fixed-size collections (subscription plans, addresses, cart items).

## Success with No Body

Return `204 No Content` for delete operations and logout.

## Create Operations

Return `201 Created` with the created object in the body.

---

> **Continue to Part 4 →** Phase 1 Plan, Task Division (8 parts), Beginner Guide, Folder Blueprint, Testing Plan, MVP vs Future, Checklist
