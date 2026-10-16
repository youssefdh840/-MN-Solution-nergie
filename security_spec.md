# Security Specification for MN Solution Énergie

## 1. Data Invariants
- **Public Quote Requests**: Visitors can create a `QuoteRequest` without authentication if mandatory fields (`reference`, `customerName`, `phone`, `service`, `projectType`, `description`, `city`, `preferredContact`, `status`, `createdAt`, `updatedAt`) are valid, initial status is `'nouveau'`, and no malicious script injection is attempted.
- **Privacy Protection**: Public visitors or unauthorized users CANNOT read, list, update, or delete customer quote requests.
- **Admin Isolation**: Only authenticated users with verified administrator status (matching `youssefdh840@gmail.com` with `email_verified == true`, `mohamednefzaoui09@gmail.com`, or in the `/admins` collection) can read, update status, add internal notes, or manage requests.
- **Privilege Escalation Prevention**: Public users or non-admins CANNOT modify administrative roles or create admin documents.

## 2. The "Dirty Dozen" Threat Payloads
1. Unauthorized public visitor attempting `get` on `/quoteRequests/req_123` -> PERMISSION_DENIED
2. Unauthorized public visitor attempting `list` on `/quoteRequests` -> PERMISSION_DENIED
3. Attacker attempting `create` with forged status `'termine'` instead of `'nouveau'` -> PERMISSION_DENIED
4. Attacker attempting `create` with missing `phone` or `customerName` -> PERMISSION_DENIED
5. Attacker attempting `create` with oversized payload (> 3000 chars description) -> PERMISSION_DENIED
6. Non-admin authenticated user attempting to read other clients' requests -> PERMISSION_DENIED
7. Non-admin authenticated user attempting to create an entry in `/admins/{uid}` -> PERMISSION_DENIED
8. Attacker spoofing email claim with `email_verified: false` -> PERMISSION_DENIED
9. Attacker attempting `update` on `quoteRequests` without admin privileges -> PERMISSION_DENIED
10. Attacker attempting `delete` on `quoteRequests` without admin privileges -> PERMISSION_DENIED
11. Attacker attempting to inject arbitrary keys into `/quoteRequests` -> PERMISSION_DENIED
12. Attacker attempting path injection with invalid ID characters -> PERMISSION_DENIED
