# Database Documentation

## Overview

This database package is designed for BALAJI POLICY MATRIX LLP and supports enterprise insurance, finance, and RTO operations. It is optimized for PostgreSQL 16 and Supabase.

## Core Tables

### organizations
Purpose: Store tenant company information.
Columns: id, company_name, company_code, gst_number, pan_number, address, city, state, pincode, website, phone, email, is_active, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Constraints: PK on id, unique company_code.
Relationships: One organization has many branches, users, customers, policies, claims, etc.
Indexes: company_code.

### branches
Purpose: Store branch information for multi-branch operations.
Columns: id, organization_id, branch_name, branch_code, city, state, phone, email, is_active, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Constraints: FK to organizations, unique organization + branch name.
Relationships: Organization has many branches; branch has many users and records.
Indexes: organization_id, branch_code.

### users
Purpose: Store system users and employees.
Columns: id, organization_id, branch_id, employee_code, name, mobile, email, password_hash, role, department, status, profile_photo_url, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Constraints: PK, FK to organization/branch, unique employee_code per organization.
Relationships: Users create and update records across the platform.
Indexes: organization_id, branch_id, role, status.

### customers
Purpose: Store customer profiles and KYC details.
Columns: id, organization_id, branch_id, customer_type, name, father_name, company_name, gst_number, pan_number, aadhaar_number, dob, mobile, alternate_mobile, whatsapp, email, address, city, state, pincode, occupation, reference_source, remarks, vip_customer, customer_status, search_vector, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Constraints: PK, FKs to organization/branch.
Relationships: Customers have many vehicles, policies, leads, follow-ups, documents and reminders.
Indexes: organization_id, branch_id, mobile, pan_number, gst_number.

### vehicles
Purpose: Store motor vehicle records.
Columns: id, organization_id, branch_id, customer_id, registration_number, chassis_number, engine_number, vehicle_type, manufacturer, model, variant, fuel_type, cc, gvw, seating_capacity, registration_date, manufacturing_year, owner_serial, hypothecation, financer, fitness_expiry, permit_expiry, tax_expiry, puc_expiry, insurance_expiry, rc_status, blacklist_flag, search_vector, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Constraints: PK, FK to customer, unique registration/chassis/engine fields.
Relationships: One customer has many vehicles.
Indexes: customer_id, registration_number, insurance_expiry.

### insurance_companies
Purpose: Master data for insurers.
Columns: id, organization_id, company_name, short_name, logo_url, portal_url, api_url, agent_code, branch_code, status, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Constraints: PK, unique short_name.
Relationships: Many policies and quotations belong to one insurer.
Indexes: organization_id, status.

### policies
Purpose: Store policy issuance and policy lifecycle information.
Columns: id, organization_id, branch_id, policy_number, customer_id, vehicle_id, insurance_company_id, policy_type, is_comprehensive, is_third_party, is_standalone_od, policy_package, start_date, end_date, premium, net_premium, gst, idv, ncb, zero_dep, engine_protect, rti, consumables, roadside_assistance, key_protect, invoice_protect, personal_accident, nominee_name, policy_pdf_url, status, search_vector, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Constraints: PK, FKs to customer/vehicle/company.
Relationships: policies have claims, renewals, commissions and finance records.
Indexes: customer_id, vehicle_id, insurance_company_id, status, end_date.

### live_quotations
Purpose: Store insurer quotes for comparison.
Columns: id, organization_id, branch_id, quotation_number, customer_id, vehicle_id, insurance_company_id, premium, idv, ncb, addons, gst, final_premium, is_selected, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Constraints: PK, FKs to customer/vehicle/company.
Relationships: Many quotations per customer and vehicle.
Indexes: customer_id, insurance_company_id, is_selected.

### claims
Purpose: Store claim submissions and outcomes.
Columns: id, organization_id, branch_id, claim_number, policy_id, customer_id, vehicle_id, claim_type, claim_amount, surveyor_name, garage_name, status, documents, settlement_amount, search_vector, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Constraints: PK, FKs to policy/customer/vehicle.
Relationships: One policy can have many claims.
Indexes: policy_id, status.

### rto_services
Purpose: Store RTO service tracking requests.
Columns: id, organization_id, branch_id, customer_id, vehicle_id, service_type, due_date, fee, status, notes, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Constraints: PK, FKs to customer/vehicle.
Relationships: One customer may have many RTO services.
Indexes: customer_id, due_date, status.

### finance_records
Purpose: Track finance and loan information.
Columns: id, organization_id, branch_id, customer_id, vehicle_id, policy_id, loan_amount, interest_rate, emi, tenure_months, finance_company, disbursement_date, outstanding_amount, status, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Relationships: Linked to customer, vehicle and policy.
Indexes: customer_id, status.

### leads
Purpose: Capture lead records and pipeline values.
Columns: id, organization_id, branch_id, lead_source, campaign, customer_id, assigned_to, status, priority, expected_premium, next_follow_up_date, remarks, search_vector, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Relationships: Each lead belongs to a customer and can have many follow-ups.
Indexes: assigned_to, status, next_follow_up_date.

### follow_ups
Purpose: Track follow-up calls, visits and meeting outcomes.
Columns: id, organization_id, branch_id, customer_id, lead_id, follow_up_date, follow_up_time, call_done, whatsapp_sent, visit_done, meeting_done, notes, reminder_at, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Relationships: Many follow-ups per lead.
Indexes: customer_id, lead_id, reminder_at.

### payments
Purpose: Track payments and receipts.
Columns: id, organization_id, branch_id, receipt_number, invoice_number, payment_mode, cash_received, cheque_number, upi_reference, bank_name, card_last4, amount, gst, balance, payment_date, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Constraints: unique receipt and invoice numbers.
Indexes: payment_date, payment_mode.

### expenses
Purpose: Track business and branch expenses.
Columns: id, organization_id, branch_id, expense_category, amount, vendor_name, gst, employee_id, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Relationships: Expenses may be tied to an employee.
Indexes: expense_category, employee_id.

### commissions
Purpose: Track insurance commissions.
Columns: id, organization_id, branch_id, insurance_company_id, policy_id, executive_id, commission_pct, commission_amount, received_amount, pending_amount, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Relationships: Many commissions per policy and executive.
Indexes: policy_id, executive_id.

### renewals
Purpose: Track policy renewals and reminders.
Columns: id, organization_id, branch_id, policy_id, customer_id, vehicle_id, due_date, reminder_1_date, reminder_2_date, reminder_3_date, whatsapp_sent, sms_sent, email_sent, status, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Relationships: One policy has many renewal records.
Indexes: policy_id, due_date, status.

### documents
Purpose: Track uploaded policy and customer documents.
Columns: id, organization_id, branch_id, customer_id, vehicle_id, policy_id, document_type, file_name, file_url, description, uploaded_by, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Relationships: Linked to customers, vehicles and policies.
Indexes: document_type, customer_id.

### whatsapp_reminder_logs
Purpose: Track outbound WhatsApp reminder activity.
Columns: id, organization_id, branch_id, customer_id, template_name, message_text, delivery_status, sent_at, created_at, updated_at, created_by, updated_by, is_deleted, deleted_at, deleted_by.
Relationships: One customer may have many logs.
Indexes: customer_id, delivery_status.

### activity_logs
Purpose: Audit user system activity.
Columns: id, organization_id, branch_id, action_type, action_detail, ip_address, browser_info, user_id, created_at, updated_at.
Relationships: Activity belongs to a user and branch.
Indexes: user_id, created_at.
