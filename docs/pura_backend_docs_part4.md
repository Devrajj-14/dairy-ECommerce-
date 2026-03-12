# Pura — Backend Documentation Pack (Part 4 of 4)
## Dev Plan · Task Division · Beginner Guide · Blueprint · Testing · Checklist

---

# 15. Phase 1 Development Plan — Recommended Order

| Order | Module | Why This Order |
|---|---|---|
| 1 | **Project Setup** | Maven project, dependencies, PostgreSQL, application.yml, CORS |
| 2 | **Entity Layer** | All JPA entities and enums — foundation for everything |
| 3 | **Auth Module** | Signup/login/JWT — required before any protected route |
| 4 | **Product Module** | Public endpoints, no auth dependency, easy to test |
| 5 | **Cart Module** | Depends on auth + products |
| 6 | **Order Module** | Depends on cart + address |
| 7 | **Subscription Module** | Depends on auth + products + plans |
| 8 | **Custom Milk Module** | Depends on auth |
| 9 | **Dashboard Module** | Aggregates from orders + subscriptions |
| 10 | **Polish & Testing** | Integration tests, edge cases, Swagger docs |

---

# 16. Task Division — 8 Team Members

## Member 1: Project Setup & Entity Layer

| Item | Detail |
|---|---|
| **Tasks** | Create Spring Boot project via Spring Initializr. Configure `application.yml` (PostgreSQL, JPA, server port). Add all dependencies. Create ALL entity classes with JPA annotations. Create ALL enums. Create ALL repository interfaces. Run app and verify tables auto-create. |
| **Deliverables** | Working project skeleton, all 14 entities, all repositories, clean build |
| **Entities** | User, Product, Cart, CartItem, Order, OrderItem, Subscription, SubscriptionPlan, CustomMilkPlan, Address, Review, DeliverySchedule |
| **Dependencies** | None — starts first |
| **Difficulty** | ⭐⭐ Medium |
| **Effort** | 1–2 days |
| **Read first** | Part 1 §5 (Database Design), Part 1 §4 (Architecture) |

## Member 2: Auth Module

| Item | Detail |
|---|---|
| **Tasks** | SecurityConfig (JWT, stateless, CORS). JwtUtil (generate, validate, extract claims). JwtAuthenticationFilter. UserDetailsService. AuthController (signup, login, refresh, logout). AuthService with BCrypt password hashing. DTOs for auth requests/responses. |
| **Deliverables** | Working signup/login, JWT generation, protected route filtering |
| **Entities** | User |
| **APIs** | `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout` |
| **Dependencies** | Needs Member 1's User entity |
| **Difficulty** | ⭐⭐⭐ Hard |
| **Effort** | 2–3 days |
| **Read first** | Part 3 §10 (Auth Plan), Part 2 §7.1 (Auth APIs) |

## Member 3: Product Module

| Item | Detail |
|---|---|
| **Tasks** | ProductController with list/filter/detail/featured/related. ProductService with filtering logic (category, milkType, search, subscriptionOnly). ProductDTO and mapper. Seed initial product data (the 8 products from frontend `data.ts`). Pagination support. |
| **Deliverables** | All product endpoints working, seeded data, filtering |
| **Entities** | Product, Review |
| **APIs** | `GET /api/products`, `GET /api/products/featured`, `GET /api/products/{id}`, `GET /api/products/{id}/related`, `GET /api/products/{id}/reviews` |
| **Dependencies** | Needs Member 1's Product entity |
| **Difficulty** | ⭐⭐ Medium |
| **Effort** | 1–2 days |
| **Read first** | Part 2 §7.2 (Product APIs), Part 2 §9.1-9.2 (examples) |

## Member 4: Cart Module

| Item | Detail |
|---|---|
| **Tasks** | CartController (get cart, add item, update qty, remove item, clear). CartService with cart creation on first use, total calculation with subscription discount, delivery fee logic. CartDTO, CartItemDTO. Validate product exists and is in stock before adding. |
| **Deliverables** | Full cart CRUD, automatic total calculation |
| **Entities** | Cart, CartItem |
| **APIs** | `GET /api/cart`, `POST /api/cart/items`, `PUT /api/cart/items/{id}`, `DELETE /api/cart/items/{id}`, `DELETE /api/cart` |
| **Dependencies** | Needs auth (Member 2) + products (Member 3) |
| **Difficulty** | ⭐⭐ Medium |
| **Effort** | 1–2 days |
| **Read first** | Part 2 §7.3, Part 3 §12 (Cart Calculation), Part 2 §9.3 |

## Member 5: Order Module

| Item | Detail |
|---|---|
| **Tasks** | OrderController (place order, list orders, order detail). OrderService: validate cart not empty, validate address belongs to user, create order with order items (snapshot prices), generate order number (ORD-XXXX), clear cart after placement. OrderDTO, OrderItemDTO. Address validation. |
| **Deliverables** | Order placement from cart, order history, order detail |
| **Entities** | Order, OrderItem, Address |
| **APIs** | `POST /api/orders`, `GET /api/orders`, `GET /api/orders/{id}` |
| **Dependencies** | Needs cart (Member 4) + auth (Member 2) |
| **Difficulty** | ⭐⭐⭐ Hard |
| **Effort** | 2–3 days |
| **Read first** | Part 3 §12 (Order Placement logic), Part 2 §7.4, Part 2 §9.4 |

## Member 6: Subscription Module

| Item | Detail |
|---|---|
| **Tasks** | SubscriptionController (list plans, create, list user subs, pause, resume, cancel). SubscriptionService: validate product is subscription-eligible, create delivery schedules, handle pause/resume logic. SubscriptionPlanDTO, SubscriptionDTO. Seed the 3 plans from frontend data. |
| **Deliverables** | Subscription CRUD, plan listing, schedule generation |
| **Entities** | SubscriptionPlan, Subscription, DeliverySchedule |
| **APIs** | `GET /api/subscription-plans`, `POST /api/subscriptions`, `GET /api/subscriptions`, `PUT /api/subscriptions/{id}/pause`, `PUT /api/subscriptions/{id}/resume` |
| **Dependencies** | Needs auth (Member 2) + products (Member 3) |
| **Difficulty** | ⭐⭐⭐ Hard |
| **Effort** | 2–3 days |
| **Read first** | Part 3 §12 (Subscription logic), Part 2 §7.5, Part 2 §9.5 |

## Member 7: User + Address + Custom Milk Module

| Item | Detail |
|---|---|
| **Tasks** | UserController (get/update profile). AddressController (CRUD). CustomMilkController (save plan, list plans). Custom milk pricing logic. User profile DTOs. Address DTOs. |
| **Deliverables** | Profile management, address CRUD, custom milk plan persistence |
| **Entities** | User, Address, CustomMilkPlan |
| **APIs** | `GET/PUT /api/users/profile`, `GET/POST/PUT/DELETE /api/users/addresses/*`, `POST/GET /api/custom-milk-plans` |
| **Dependencies** | Needs auth (Member 2) |
| **Difficulty** | ⭐⭐ Medium |
| **Effort** | 1–2 days |
| **Read first** | Part 2 §7.6-7.7, Part 3 §12 (Custom Milk Pricing), Part 2 §9.7 |

## Member 8: Dashboard + Error Handling + Testing + Swagger

| Item | Detail |
|---|---|
| **Tasks** | DashboardController (summary, upcoming deliveries). DashboardService (aggregate from orders, subscriptions, schedules). GlobalExceptionHandler with all exception types. Standard error response format. Swagger/OpenAPI configuration. Integration tests for critical flows (auth, cart→order). Seed data script. |
| **Deliverables** | Dashboard endpoints, consistent error handling, API documentation, test suite |
| **Entities** | Reads from Order, Subscription, DeliverySchedule |
| **APIs** | `GET /api/dashboard/summary`, `GET /api/dashboard/upcoming-deliveries` |
| **Dependencies** | Needs most other modules complete |
| **Difficulty** | ⭐⭐⭐ Hard (coordination role) |
| **Effort** | 2–3 days |
| **Read first** | Part 3 §12-14, Part 2 §7.8 |

---

# 17. Beginner-Friendly Implementation Guide

## How a Request Flows Through Spring Boot

```
1. HTTP request arrives at the server
2. Spring Security filter checks JWT token (if route is protected)
3. If valid, request reaches the Controller
4. Controller validates the request body using @Valid annotations
5. Controller calls the Service method
6. Service contains business logic, calls Repository for DB operations
7. Repository uses JPA to query/save to PostgreSQL
8. Service maps Entity to DTO and returns
9. Controller returns DTO as JSON response
```

## What to Build First (For Any Module)

1. **Entity** — Create the JPA class with `@Entity`, `@Table`, `@Id`, field annotations
2. **Repository** — Create interface extending `JpaRepository<EntityClass, IdType>`
3. **DTO** — Create request/response classes in `dto/request/` and `dto/response/`
4. **Service** — Create class with `@Service`, inject repository, write business methods
5. **Controller** — Create class with `@RestController`, inject service, define routes

## How to Test Routes in Postman

1. Start with `POST /api/auth/signup` — create a user
2. Use `POST /api/auth/login` — get a JWT token
3. For protected routes, add header: `Authorization: Bearer <your_token>`
4. Test `GET /api/products` (public, no token needed)
5. Test `POST /api/cart/items` (needs token + valid productId)
6. Build up from there

## Connecting Frontend Later

1. In Next.js, replace mock data imports with `fetch('/api/...')` calls
2. Change the base URL to point to `http://localhost:8080` (Spring Boot default)
3. Configure CORS in Spring Boot to allow the frontend origin
4. Store JWT token from login in localStorage
5. Add token to fetch headers for protected routes

---

# 18. Suggested Folder/File Blueprint

```
pura-backend/
├── pom.xml
├── src/
│   └── main/
│       ├── java/com/pura/dairy/
│       │   ├── PuraApplication.java
│       │   ├── config/
│       │   │   ├── CorsConfig.java
│       │   │   ├── SecurityConfig.java
│       │   │   ├── SwaggerConfig.java
│       │   │   └── DataSeeder.java
│       │   ├── security/
│       │   │   ├── JwtUtil.java
│       │   │   ├── JwtAuthenticationFilter.java
│       │   │   └── CustomUserDetailsService.java
│       │   ├── entity/
│       │   │   ├── User.java
│       │   │   ├── Address.java
│       │   │   ├── Product.java
│       │   │   ├── Cart.java
│       │   │   ├── CartItem.java
│       │   │   ├── Order.java
│       │   │   ├── OrderItem.java
│       │   │   ├── SubscriptionPlan.java
│       │   │   ├── Subscription.java
│       │   │   ├── DeliverySchedule.java
│       │   │   ├── CustomMilkPlan.java
│       │   │   └── Review.java
│       │   ├── enums/
│       │   │   ├── ProductCategory.java
│       │   │   ├── MilkType.java
│       │   │   ├── FatProfile.java
│       │   │   ├── DeliveryFrequency.java
│       │   │   ├── DeliveryTime.java
│       │   │   ├── OrderStatus.java
│       │   │   ├── PaymentStatus.java
│       │   │   ├── SubscriptionStatus.java
│       │   │   ├── DeliveryStatus.java
│       │   │   └── UserRole.java
│       │   ├── repository/
│       │   │   ├── UserRepository.java
│       │   │   ├── AddressRepository.java
│       │   │   ├── ProductRepository.java
│       │   │   ├── CartRepository.java
│       │   │   ├── CartItemRepository.java
│       │   │   ├── OrderRepository.java
│       │   │   ├── OrderItemRepository.java
│       │   │   ├── SubscriptionPlanRepository.java
│       │   │   ├── SubscriptionRepository.java
│       │   │   ├── DeliveryScheduleRepository.java
│       │   │   ├── CustomMilkPlanRepository.java
│       │   │   └── ReviewRepository.java
│       │   ├── dto/
│       │   │   ├── request/
│       │   │   │   ├── SignupRequest.java
│       │   │   │   ├── LoginRequest.java
│       │   │   │   ├── AddCartItemRequest.java
│       │   │   │   ├── UpdateCartItemRequest.java
│       │   │   │   ├── CreateOrderRequest.java
│       │   │   │   ├── CreateSubscriptionRequest.java
│       │   │   │   ├── CreateCustomMilkPlanRequest.java
│       │   │   │   ├── AddressRequest.java
│       │   │   │   └── UpdateProfileRequest.java
│       │   │   └── response/
│       │   │       ├── AuthResponse.java
│       │   │       ├── UserResponse.java
│       │   │       ├── ProductResponse.java
│       │   │       ├── ProductDetailResponse.java
│       │   │       ├── CartResponse.java
│       │   │       ├── OrderResponse.java
│       │   │       ├── SubscriptionResponse.java
│       │   │       ├── DashboardSummaryResponse.java
│       │   │       ├── CustomMilkPlanResponse.java
│       │   │       └── ErrorResponse.java
│       │   ├── service/
│       │   │   ├── AuthService.java
│       │   │   ├── ProductService.java
│       │   │   ├── CartService.java
│       │   │   ├── OrderService.java
│       │   │   ├── SubscriptionService.java
│       │   │   ├── CustomMilkService.java
│       │   │   ├── UserService.java
│       │   │   └── DashboardService.java
│       │   ├── controller/
│       │   │   ├── AuthController.java
│       │   │   ├── ProductController.java
│       │   │   ├── CartController.java
│       │   │   ├── OrderController.java
│       │   │   ├── SubscriptionController.java
│       │   │   ├── CustomMilkController.java
│       │   │   ├── UserController.java
│       │   │   └── DashboardController.java
│       │   ├── mapper/
│       │   │   ├── ProductMapper.java
│       │   │   ├── CartMapper.java
│       │   │   ├── OrderMapper.java
│       │   │   └── SubscriptionMapper.java
│       │   ├── exception/
│       │   │   ├── GlobalExceptionHandler.java
│       │   │   ├── ResourceNotFoundException.java
│       │   │   ├── BusinessRuleException.java
│       │   │   ├── DuplicateResourceException.java
│       │   │   └── UnauthorizedException.java
│       │   └── util/
│       │       └── OrderNumberGenerator.java
│       └── resources/
│           ├── application.yml
│           └── data.sql (optional seed data)
└── src/test/java/com/pura/dairy/
    ├── controller/
    ├── service/
    └── repository/
```

---

# 19. Postman / Testing Plan

## Collection Structure

| Collection | Routes to Test |
|---|---|
| **01 Auth** | Signup → Login → Refresh → Logout |
| **02 Products** | List all → Filter by category → Filter by milkType → Single detail → Related → Reviews |
| **03 Cart** | Add item → Get cart → Update qty → Remove item → Clear cart |
| **04 Orders** | Place order → List orders → Order detail |
| **05 Subscriptions** | List plans → Create sub → List user subs → Pause → Resume |
| **06 Custom Milk** | Save plan → List plans |
| **07 User/Address** | Get profile → Update profile → Add address → List → Delete |
| **08 Dashboard** | Summary → Upcoming deliveries |

## Integration Test Flows

1. **Full purchase flow**: Signup → Login → Browse products → Add to cart → Add address → Place order → Verify order in history
2. **Subscription flow**: Login → View plans → Create subscription → Verify in dashboard → Pause → Resume
3. **Custom milk flow**: Login → Save custom plan → Add to cart → Checkout
4. **Auth edge cases**: Expired token → 401. Wrong password → 401. Duplicate email → 409.

---

# 20. Open Questions / Assumptions

| # | Assumption | Impact |
|---|---|---|
| 1 | No real payment gateway in Phase 1. Orders will be created with `paymentStatus=PENDING` | Payment integration is Phase 2 |
| 2 | AI Advisor stays in Next.js API route (already works with Gemini) | No Spring Boot advisor endpoint needed now |
| 3 | Product images are not uploaded — emojis/static assets are used | No file upload service needed |
| 4 | Same user cannot have two identical products in cart (upsert quantity) | Cart service should check and merge |
| 5 | Coupon validation returns mock success/failure | Real coupon engine is Phase 2 |
| 6 | Review submission is read-only (seed mock reviews) | Review POST API is Phase 2 |
| 7 | Email/SMS notifications not included | Phase 2 |
| 8 | Admin panel not included | Use Postman or DB client initially |
| 9 | Delivery schedule generation is simplified (next 30 days) | Real logistics integration is Phase 2 |
| 10 | Fat percentage pricing is a simple formula, not dynamic | Can be made configurable later |

---

# 21. Minimum Viable Backend vs Future Enhancements

## Must Build Now (MVP)

- [x] User signup/login with JWT
- [x] Product listing, filtering, detail
- [x] Cart CRUD with totals
- [x] Order placement from cart
- [x] Subscription creation and management (pause/resume)
- [x] Custom milk plan persistence
- [x] Address CRUD
- [x] Dashboard stats and upcoming deliveries
- [x] Global error handling
- [x] Data seeding (8 products, 3 plans)

## Build Later (Future)

- [ ] Real payment gateway (Razorpay/Stripe)
- [ ] Email/SMS notifications (order confirmation, delivery reminder)
- [ ] Admin dashboard APIs (product CRUD, order management)
- [ ] Review submission by users
- [ ] Coupon engine with rules
- [ ] Delivery tracking with real-time status
- [ ] Image upload for products
- [ ] Push notifications
- [ ] Analytics/reporting APIs
- [ ] Rate limiting and API throttling
- [ ] Advisor session logging in backend
- [ ] Multi-language support
- [ ] Inventory management

---

# 22. Final Implementation Checklist

### Project Foundation
- [ ] Spring Boot project created with all dependencies
- [ ] `application.yml` configured for PostgreSQL
- [ ] CORS configured for frontend origin
- [ ] All 14 entities created with JPA annotations
- [ ] All 10 enums created
- [ ] All repositories created
- [ ] Tables auto-created successfully

### Auth
- [ ] BCrypt password hashing works
- [ ] JWT generation and validation works
- [ ] Signup creates user and returns token
- [ ] Login validates credentials and returns token
- [ ] JwtAuthenticationFilter protects secured routes
- [ ] Public routes accessible without token

### Products Module
- [ ] GET /api/products returns paginated list
- [ ] Filtering by category, milkType, search works
- [ ] GET /api/products/{id} returns single product
- [ ] GET /api/products/{id}/related returns related products
- [ ] 8 products seeded from frontend data

### Cart Module
- [ ] Cart created automatically on first add
- [ ] Add, update, remove, clear cart items work
- [ ] Subscription discount (5%) calculated correctly
- [ ] Delivery fee logic works (free above ₹200)
- [ ] Product existence validated before adding

### Order Module
- [ ] Order created from cart with address
- [ ] Order items snapshot prices correctly
- [ ] Cart cleared after order placement
- [ ] Order number generated (ORD-XXXX)
- [ ] Order history returns user's orders

### Subscription Module
- [ ] 3 plans seeded
- [ ] Subscription creation validates product eligibility
- [ ] Pause sets status and marks future schedules as SKIPPED
- [ ] Resume reactivates and regenerates schedules
- [ ] Custom days validated for "custom" plan

### User / Address / Custom Milk
- [ ] Profile get and update work
- [ ] Address CRUD works with ownership validation
- [ ] Custom milk plan saved with pricing calculation
- [ ] Default address flag toggles correctly

### Dashboard
- [ ] Summary aggregates correctly
- [ ] Upcoming deliveries returned in date order
- [ ] Empty state handled (new user with no data)

### Quality
- [ ] GlobalExceptionHandler catches all error types
- [ ] Validation errors return field-level messages
- [ ] Swagger UI accessible at `/swagger-ui.html`
- [ ] Integration tests pass for auth + cart → order flow
- [ ] `mvn clean install` builds without errors

---

> **End of Documentation Pack**
>
> This 4-part document provides everything needed to build the Pura Spring Boot backend. Start with Member 1 (setup + entities), then Members 2–3 can work in parallel, followed by Members 4–8 who depend on auth and products.
