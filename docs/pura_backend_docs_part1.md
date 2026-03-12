# Pura — Backend Documentation Pack (Part 1 of 4)
## Executive Summary · Frontend Mapping · Architecture · Database Design

---

# 1. Executive Summary

**Pura** is a premium dairy e-commerce platform. Users can browse dairy products (A2 cow milk, buffalo milk, ghee, paneer, curd, buttermilk), subscribe for recurring delivery, build a custom milk plan with specific fat/richness preferences, manage their cart and orders, and interact with an AI dairy advisor.

The **frontend is already built** with Next.js 16, React 19, Tailwind v4, and Framer Motion. It currently runs on mock data from `lib/data.ts`. The backend's job is to replace this mock data with real persistence, auth, and business logic.

**Tech stack for backend:** Spring Boot 3 · Java 17+ · PostgreSQL · Spring Data JPA · Maven · REST API · JWT Auth

---

# 2. Product Understanding — Frontend → Backend Mapping

## 2.1 Landing Page (`/`)

| Aspect | Detail |
|---|---|
| What it does | Brand hero, product showcase, how-it-works, testimonials, video section, CTA funnels |
| Data needed | Featured products, testimonials, brand stats |
| Dynamic or static? | Mostly static. Products can be dynamic if "featured" flag exists |
| Backend endpoints | `GET /api/products/featured` (optional), `GET /api/testimonials` (optional) |
| Entities | Product, Testimonial (optional) |
| Phase 1? | Optional — can stay mock on frontend |

## 2.2 Shop Page (`/shop`)

| Aspect | Detail |
|---|---|
| What it does | Lists all products with filtering by category, milk type, subscription eligibility, and search |
| Data needed | Full product list with category, milkType, fatPercentage, price, rating, badges |
| Dynamic? | **Yes — core dynamic page** |
| Endpoints | `GET /api/products` with query params: `category`, `milkType`, `subscriptionOnly`, `search` |
| Entities | Product, ProductCategory (enum) |
| Phase 1? | **Yes** |

## 2.3 Product Detail (`/product/[id]`)

| Aspect | Detail |
|---|---|
| What it does | Shows one product: gallery, fat visualization, nutrition facts, reviews, related products |
| Data needed | Single product by ID, related products, reviews |
| Endpoints | `GET /api/products/{id}`, `GET /api/products/{id}/reviews`, `GET /api/products/{id}/related` |
| Entities | Product, Review |
| Phase 1? | **Yes** |

## 2.4 Custom Milk Builder (`/custom`)

| Aspect | Detail |
|---|---|
| What it does | 4-step wizard: milk type → richness/fat → quantity & schedule → confirm & add to cart |
| Data needed | Fat profiles (can stay static), save custom plan on confirm |
| Endpoints | `POST /api/custom-milk-plans` (save plan), `POST /api/cart/items` (add to cart) |
| Entities | CustomMilkPlan, CartItem |
| Phase 1? | **Yes** |

## 2.5 Subscribe Page (`/subscribe`)

| Aspect | Detail |
|---|---|
| What it does | Shows 3 subscription plans (Daily, Alternate, Custom Days), lets user select and proceed to cart |
| Data needed | Subscription plan definitions, custom day selection |
| Endpoints | `GET /api/subscription-plans`, `POST /api/subscriptions` |
| Entities | SubscriptionPlan, Subscription |
| Phase 1? | **Yes** |

## 2.6 Cart Page (`/cart`)

| Aspect | Detail |
|---|---|
| What it does | 3-step checkout: Cart → Delivery → Payment. Shows items, coupon input, delivery form, payment method selection |
| Data needed | Cart items, price calculation, address, order creation |
| Endpoints | `GET /api/cart`, `POST /api/cart/items`, `PUT /api/cart/items/{id}`, `DELETE /api/cart/items/{id}`, `POST /api/orders`, `POST /api/coupons/validate` |
| Entities | Cart, CartItem, Order, OrderItem, Address, Coupon |
| Phase 1? | **Yes** |

## 2.7 Dashboard (`/dashboard`)

| Aspect | Detail |
|---|---|
| What it does | 4 tabs: Overview (stats, upcoming deliveries), Subscriptions (active plans, pause/resume), Orders (history, reorder), Settings (profile) |
| Data needed | User stats, delivery schedule, subscriptions, order history, profile |
| Endpoints | `GET /api/dashboard/summary`, `GET /api/orders`, `GET /api/subscriptions`, `PUT /api/subscriptions/{id}/pause`, `PUT /api/subscriptions/{id}/resume`, `PUT /api/users/profile` |
| Entities | User, Order, Subscription, DeliverySchedule |
| Phase 1? | **Yes** |

## 2.8 Advisor (`/advisor`)

| Aspect | Detail |
|---|---|
| What it does | AI-powered dairy advisor chat. Already uses `POST /api/advisor` hitting Gemini API |
| Data needed | Chat messages in/out, product recommendation parsing |
| Endpoints | `POST /api/advisor` (already exists as Next.js route — keep or migrate) |
| Entities | AdvisorSession (optional logging) |
| Phase 1? | **Keep as-is** in Next.js API route. Optionally log sessions later |

## 2.9 About (`/about`)

| Aspect | Detail |
|---|---|
| What it does | Editorial brand story, values, farm sourcing info |
| Data needed | None dynamic |
| Endpoints | None |
| Phase 1? | No backend needed |

---

# 3. Core Backend Scope

## Phase 1 — Must Build

| Module | What to Build |
|---|---|
| **Auth** | Signup, login, JWT token, refresh, logout, password hashing |
| **Users** | Profile CRUD, address management |
| **Products** | Full CRUD (admin), list/filter/detail (public) |
| **Cart** | Per-user cart with add/update/remove/clear |
| **Orders** | Place order from cart, order history, order detail |
| **Subscriptions** | Create, pause, resume, cancel, list user subscriptions |
| **Custom Milk Plans** | Save custom milk configurations, link to cart |
| **Dashboard** | Aggregated stats endpoint, upcoming deliveries |

## Phase 2 — Postpone

| Module | Why Postpone |
|---|---|
| Payment gateway integration | Frontend-only scope for now, use mock status |
| Email/SMS notifications | Nice-to-have, not blocking |
| Admin panel APIs | Can use Postman/DB initially |
| Review submission | Read-only mock reviews are fine for phase 1 |
| Coupon engine | Validate endpoint can return mock success |
| Testimonial management | Keep static on frontend |
| Advisor session logging | AI route already works in Next.js |
| Delivery tracking | Future feature |

---

# 4. Recommended Spring Boot Architecture

## Package Structure

```
com.pura.dairy
├── config/                 # Security config, CORS, Swagger, app config
│   ├── SecurityConfig.java
│   ├── CorsConfig.java
│   ├── SwaggerConfig.java
│   └── JwtConfig.java
├── controller/             # REST controllers (one per module)
│   ├── AuthController.java
│   ├── ProductController.java
│   ├── CartController.java
│   ├── OrderController.java
│   ├── SubscriptionController.java
│   ├── CustomMilkController.java
│   ├── UserController.java
│   └── DashboardController.java
├── service/                # Business logic
│   ├── AuthService.java
│   ├── ProductService.java
│   ├── CartService.java
│   ├── OrderService.java
│   ├── SubscriptionService.java
│   ├── CustomMilkService.java
│   ├── UserService.java
│   └── DashboardService.java
├── repository/             # Spring Data JPA interfaces
│   ├── UserRepository.java
│   ├── ProductRepository.java
│   ├── CartRepository.java
│   ├── CartItemRepository.java
│   ├── OrderRepository.java
│   ├── SubscriptionRepository.java
│   └── ...
├── entity/                 # JPA entities
│   ├── User.java
│   ├── Product.java
│   ├── Cart.java
│   ├── CartItem.java
│   ├── Order.java
│   ├── OrderItem.java
│   ├── Subscription.java
│   ├── SubscriptionPlan.java
│   ├── CustomMilkPlan.java
│   ├── Address.java
│   ├── Review.java
│   └── DeliverySchedule.java
├── dto/                    # Request/response DTOs
│   ├── request/
│   └── response/
├── mapper/                 # Entity ↔ DTO mappers
├── enums/                  # OrderStatus, PaymentStatus, etc.
├── exception/              # Custom exceptions + GlobalExceptionHandler
├── security/               # JWT filter, UserDetailsService
└── util/                   # Helper utilities
```

## Layer Flow

```
Client Request → Controller → Service → Repository → Database
                     ↓              ↓
                    DTO           Entity
```

- **Controller**: Receives HTTP request, validates input, delegates to Service, returns DTO response
- **Service**: Contains business logic, calls Repository, maps entities to DTOs
- **Repository**: Extends `JpaRepository`, provides DB access
- **Entity**: Maps to database table via JPA annotations
- **DTO**: Shapes data for API input/output, never exposes entity directly

---

# 5. Database Design

## 5.1 Entity Table — Complete Reference

### `users`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | BIGINT | PK, AUTO_INCREMENT | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Login identifier |
| password_hash | VARCHAR(255) | NOT NULL | BCrypt hashed |
| full_name | VARCHAR(100) | NOT NULL | |
| phone | VARCHAR(15) | | |
| role | ENUM('USER','ADMIN') | DEFAULT 'USER' | |
| created_at | TIMESTAMP | NOT NULL | |
| updated_at | TIMESTAMP | | |

### `addresses`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | BIGINT | PK | |
| user_id | BIGINT | FK → users.id, NOT NULL | |
| full_name | VARCHAR(100) | NOT NULL | Recipient name |
| phone | VARCHAR(15) | NOT NULL | |
| address_line | VARCHAR(255) | NOT NULL | |
| city | VARCHAR(100) | NOT NULL | |
| pincode | VARCHAR(10) | NOT NULL | |
| is_default | BOOLEAN | DEFAULT false | |

### `products`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | VARCHAR(50) | PK | Slug-style: `a2-cow-milk-1l` |
| name | VARCHAR(100) | NOT NULL | |
| short_name | VARCHAR(50) | NOT NULL | For cart display |
| category | ENUM | NOT NULL | fresh-milk, curd, ghee, paneer, buttermilk |
| milk_type | ENUM | NULLABLE | cow, buffalo |
| fat_percentage | DECIMAL(3,1) | NULLABLE | e.g. 3.5 |
| fat_profile | ENUM | NULLABLE | light, balanced, rich, full-cream |
| price_per_unit | INTEGER | NOT NULL | In rupees |
| price_unit | VARCHAR(20) | NOT NULL | /L, /500g, /500ml |
| quantity_value | INTEGER | NOT NULL | 1, 500, 300 |
| quantity_unit | VARCHAR(5) | NOT NULL | L, g, ml |
| is_subscription_eligible | BOOLEAN | DEFAULT false | |
| badge_label | VARCHAR(50) | NULLABLE | "A2 Certified", "Best Seller" |
| description | TEXT | NOT NULL | |
| benefits | TEXT | | JSON array stored as text |
| farm_source | VARCHAR(200) | | |
| delivery_note | VARCHAR(200) | | |
| nutrition_facts | TEXT | NULLABLE | JSON array |
| rating | DECIMAL(2,1) | DEFAULT 0 | |
| review_count | INTEGER | DEFAULT 0 | |
| in_stock | BOOLEAN | DEFAULT true | |
| created_at | TIMESTAMP | | |

### `carts`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | BIGINT | PK | |
| user_id | BIGINT | FK → users.id, UNIQUE | One cart per user |
| updated_at | TIMESTAMP | | |

### `cart_items`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | BIGINT | PK | |
| cart_id | BIGINT | FK → carts.id | |
| product_id | VARCHAR(50) | FK → products.id | |
| quantity | INTEGER | NOT NULL, MIN 1 | |
| is_subscription | BOOLEAN | DEFAULT false | |

### `orders`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | BIGINT | PK | |
| order_number | VARCHAR(20) | UNIQUE | e.g. ORD-8821 |
| user_id | BIGINT | FK → users.id | |
| address_id | BIGINT | FK → addresses.id | |
| subtotal | INTEGER | NOT NULL | |
| delivery_fee | INTEGER | DEFAULT 0 | |
| total | INTEGER | NOT NULL | |
| status | ENUM | DEFAULT 'PLACED' | PLACED, CONFIRMED, DISPATCHED, DELIVERED, CANCELLED |
| payment_status | ENUM | DEFAULT 'PENDING' | PENDING, PAID, FAILED, REFUNDED |
| payment_method | VARCHAR(20) | NULLABLE | upi, card, netbanking |
| delivery_time | ENUM | | morning, evening |
| placed_at | TIMESTAMP | NOT NULL | |

### `order_items`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | BIGINT | PK | |
| order_id | BIGINT | FK → orders.id | |
| product_id | VARCHAR(50) | FK → products.id | |
| product_name | VARCHAR(100) | NOT NULL | Snapshot at order time |
| quantity | INTEGER | NOT NULL | |
| unit_price | INTEGER | NOT NULL | Price at order time |
| is_subscription | BOOLEAN | DEFAULT false | |

### `subscription_plans`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | VARCHAR(20) | PK | daily, alternate, custom |
| name | VARCHAR(50) | NOT NULL | |
| tagline | VARCHAR(100) | | |
| price_per_day | INTEGER | NOT NULL | |
| price_per_month | INTEGER | NOT NULL | |
| delivery_frequency | ENUM | NOT NULL | DAILY, ALTERNATE, CUSTOM |
| features | TEXT | | JSON array |
| is_highlighted | BOOLEAN | DEFAULT false | |
| highlight_label | VARCHAR(30) | NULLABLE | |

### `subscriptions`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | BIGINT | PK | |
| user_id | BIGINT | FK → users.id | |
| plan_id | VARCHAR(20) | FK → subscription_plans.id | |
| product_id | VARCHAR(50) | FK → products.id | |
| quantity_litres | DECIMAL(3,1) | NOT NULL | |
| delivery_time | ENUM | NOT NULL | morning, evening |
| custom_days | VARCHAR(20) | NULLABLE | "1,3,5" for Mon/Wed/Fri |
| status | ENUM | DEFAULT 'ACTIVE' | ACTIVE, PAUSED, CANCELLED |
| started_at | TIMESTAMP | NOT NULL | |
| paused_at | TIMESTAMP | NULLABLE | |

### `custom_milk_plans`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | BIGINT | PK | |
| user_id | BIGINT | FK → users.id | |
| milk_type | ENUM | NOT NULL | cow, buffalo |
| fat_profile | ENUM | NOT NULL | light, balanced, rich, full-cream |
| fat_percentage | DECIMAL(3,1) | NOT NULL | |
| quantity_litres | DECIMAL(3,1) | NOT NULL | |
| delivery_frequency | ENUM | NOT NULL | |
| delivery_time | ENUM | NOT NULL | |
| custom_days | VARCHAR(20) | NULLABLE | |
| price_per_delivery | INTEGER | NOT NULL | |
| created_at | TIMESTAMP | | |

### `reviews`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | BIGINT | PK | |
| product_id | VARCHAR(50) | FK → products.id | |
| user_id | BIGINT | FK → users.id, NULLABLE | |
| reviewer_name | VARCHAR(50) | NOT NULL | |
| rating | INTEGER | NOT NULL, 1–5 | |
| text | TEXT | | |
| created_at | TIMESTAMP | | |

### `delivery_schedules`
| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | BIGINT | PK | |
| subscription_id | BIGINT | FK → subscriptions.id | |
| delivery_date | DATE | NOT NULL | |
| delivery_time | ENUM | NOT NULL | |
| items_summary | VARCHAR(255) | | "A2 Cow Milk — 1L" |
| status | ENUM | DEFAULT 'UPCOMING' | UPCOMING, CONFIRMED, DELIVERED, SKIPPED |

---

> **Continue to Part 2 →** API Routes, Request/Response Examples, Frontend-Backend Mapping Table
