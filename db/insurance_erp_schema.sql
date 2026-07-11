-- =============================================================
-- BALAJI POLICY MATRIX LLP
-- Enterprise Insurance, Finance & RTO Management ERP
-- PostgreSQL schema for Supabase deployment
-- =============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- =============================================================
-- CORE TENANCY TABLES
-- =============================================================

CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    company_code VARCHAR(50) UNIQUE,
    gst_number VARCHAR(50),
    pan_number VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20),
    website VARCHAR(255),
    phone VARCHAR(30),
    email VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_name VARCHAR(150) NOT NULL,
    branch_code VARCHAR(50) UNIQUE,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20),
    phone VARCHAR(30),
    email VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    CONSTRAINT uq_branch_org_name UNIQUE (organization_id, branch_name)
);

-- =============================================================
-- USERS AND AUTHORIZATION
-- =============================================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    employee_code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(40) NOT NULL CHECK (role IN ('admin','manager','executive','underwriter','rto','finance','support','viewer')),
    department VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','suspended','locked')),
    profile_photo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    CONSTRAINT uq_user_org_employee UNIQUE (organization_id, employee_code)
);

CREATE INDEX IF NOT EXISTS idx_users_org_branch ON users(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- =============================================================
-- CUSTOMERS
-- =============================================================

CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    customer_type VARCHAR(40) NOT NULL DEFAULT 'individual' CHECK (customer_type IN ('individual','corporate','dealer','broker')),
    name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    company_name VARCHAR(255),
    gst_number VARCHAR(50),
    pan_number VARCHAR(20),
    aadhaar_number VARCHAR(20),
    dob DATE,
    mobile VARCHAR(20) NOT NULL,
    alternate_mobile VARCHAR(20),
    whatsapp VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20),
    occupation VARCHAR(100),
    reference_source VARCHAR(150),
    remarks TEXT,
    vip_customer BOOLEAN NOT NULL DEFAULT FALSE,
    customer_status VARCHAR(30) NOT NULL DEFAULT 'active' CHECK (customer_status IN ('active','inactive','lead','prospect','blacklisted','closed')),
    search_vector TSVECTOR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_customers_org_branch ON customers(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_customers_mobile ON customers(mobile);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(customer_status);
CREATE INDEX IF NOT EXISTS idx_customers_search ON customers USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_pan ON customers(pan_number);
CREATE INDEX IF NOT EXISTS idx_customers_gst ON customers(gst_number);

-- =============================================================
-- VEHICLES
-- =============================================================

CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    registration_number VARCHAR(50) NOT NULL UNIQUE,
    chassis_number VARCHAR(50) UNIQUE,
    engine_number VARCHAR(50) UNIQUE,
    vehicle_type VARCHAR(60) NOT NULL,
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    variant VARCHAR(100),
    fuel_type VARCHAR(30),
    cc INTEGER,
    gvw NUMERIC(10,2),
    seating_capacity INTEGER,
    registration_date DATE,
    manufacturing_year INTEGER,
    owner_serial INTEGER,
    hypothecation VARCHAR(100),
    financer VARCHAR(150),
    fitness_expiry DATE,
    permit_expiry DATE,
    tax_expiry DATE,
    puc_expiry DATE,
    insurance_expiry DATE,
    rc_status VARCHAR(40) DEFAULT 'active' CHECK (rc_status IN ('active','expired','pending','blocked')),
    blacklist_flag BOOLEAN NOT NULL DEFAULT FALSE,
    search_vector TSVECTOR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_vehicles_org_branch ON vehicles(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_customer ON vehicles(customer_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_registration ON vehicles(registration_number);
CREATE INDEX IF NOT EXISTS idx_vehicles_insurance_expiry ON vehicles(insurance_expiry);
CREATE INDEX IF NOT EXISTS idx_vehicles_search ON vehicles USING GIN(search_vector);

-- =============================================================
-- INSURANCE COMPANIES
-- =============================================================

CREATE TABLE IF NOT EXISTS insurance_companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    company_name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50) NOT NULL UNIQUE,
    logo_url TEXT,
    portal_url TEXT,
    api_url TEXT,
    agent_code VARCHAR(100),
    branch_code VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','maintenance')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_insurance_companies_org ON insurance_companies(organization_id);
CREATE INDEX IF NOT EXISTS idx_insurance_companies_status ON insurance_companies(status);

-- =============================================================
-- POLICIES
-- =============================================================

CREATE TABLE IF NOT EXISTS policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    policy_number VARCHAR(100) NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
    insurance_company_id UUID NOT NULL REFERENCES insurance_companies(id) ON DELETE RESTRICT,
    policy_type VARCHAR(40) NOT NULL DEFAULT 'comprehensive' CHECK (policy_type IN ('comprehensive','third_party','standalone_od','package')),
    is_comprehensive BOOLEAN NOT NULL DEFAULT TRUE,
    is_third_party BOOLEAN NOT NULL DEFAULT FALSE,
    is_standalone_od BOOLEAN NOT NULL DEFAULT FALSE,
    policy_package VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    premium NUMERIC(12,2) NOT NULL DEFAULT 0,
    net_premium NUMERIC(12,2) NOT NULL DEFAULT 0,
    gst NUMERIC(12,2) NOT NULL DEFAULT 0,
    idv NUMERIC(12,2) NOT NULL DEFAULT 0,
    ncb NUMERIC(5,2) NOT NULL DEFAULT 0,
    zero_dep BOOLEAN NOT NULL DEFAULT FALSE,
    engine_protect BOOLEAN NOT NULL DEFAULT FALSE,
    rti BOOLEAN NOT NULL DEFAULT FALSE,
    consumables BOOLEAN NOT NULL DEFAULT FALSE,
    roadside_assistance BOOLEAN NOT NULL DEFAULT FALSE,
    key_protect BOOLEAN NOT NULL DEFAULT FALSE,
    invoice_protect BOOLEAN NOT NULL DEFAULT FALSE,
    personal_accident BOOLEAN NOT NULL DEFAULT FALSE,
    nominee_name VARCHAR(255),
    policy_pdf_url TEXT,
    status VARCHAR(40) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','issued','active','expired','cancelled','pending')),
    search_vector TSVECTOR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_policies_org_branch ON policies(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_policies_customer ON policies(customer_id);
CREATE INDEX IF NOT EXISTS idx_policies_vehicle ON policies(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_policies_company ON policies(insurance_company_id);
CREATE INDEX IF NOT EXISTS idx_policies_status ON policies(status);
CREATE INDEX IF NOT EXISTS idx_policies_end_date ON policies(end_date);
CREATE INDEX IF NOT EXISTS idx_policies_search ON policies USING GIN(search_vector);

-- =============================================================
-- LIVE QUOTATIONS
-- =============================================================

CREATE TABLE IF NOT EXISTS live_quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    quotation_number VARCHAR(100) NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
    insurance_company_id UUID NOT NULL REFERENCES insurance_companies(id) ON DELETE RESTRICT,
    premium NUMERIC(12,2) NOT NULL DEFAULT 0,
    idv NUMERIC(12,2) NOT NULL DEFAULT 0,
    ncb NUMERIC(5,2) NOT NULL DEFAULT 0,
    addons JSONB NOT NULL DEFAULT '[]'::JSONB,
    gst NUMERIC(12,2) NOT NULL DEFAULT 0,
    final_premium NUMERIC(12,2) NOT NULL DEFAULT 0,
    is_selected BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_live_quotations_org_branch ON live_quotations(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_live_quotations_customer ON live_quotations(customer_id);
CREATE INDEX IF NOT EXISTS idx_live_quotations_company ON live_quotations(insurance_company_id);
CREATE INDEX IF NOT EXISTS idx_live_quotations_selected ON live_quotations(is_selected);

-- =============================================================
-- CLAIMS
-- =============================================================

CREATE TABLE IF NOT EXISTS claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    claim_number VARCHAR(100) NOT NULL UNIQUE,
    policy_id UUID NOT NULL REFERENCES policies(id) ON DELETE RESTRICT,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
    claim_type VARCHAR(40) NOT NULL DEFAULT 'own_damage' CHECK (claim_type IN ('own_damage','third_party','theft','cashless','non_cashless')),
    claim_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    surveyor_name VARCHAR(255),
    garage_name VARCHAR(255),
    status VARCHAR(40) NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted','under_review','approved','rejected','settled','closed')),
    documents JSONB NOT NULL DEFAULT '[]'::JSONB,
    settlement_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    search_vector TSVECTOR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_claims_org_branch ON claims(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_claims_policy ON claims(policy_id);
CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_search ON claims USING GIN(search_vector);

-- =============================================================
-- RTO SERVICES
-- =============================================================

CREATE TABLE IF NOT EXISTS rto_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
    service_type VARCHAR(40) NOT NULL CHECK (service_type IN ('fitness','permit','road_tax','transfer','noc','hypothecation_add','hypothecation_remove','duplicate_rc','address_change','smart_card','license','permit_renewal','fitness_renewal','green_tax','other')),
    due_date DATE,
    fee NUMERIC(12,2) NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','in_progress','completed','cancelled')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_rto_services_org_branch ON rto_services(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_rto_services_customer ON rto_services(customer_id);
CREATE INDEX IF NOT EXISTS idx_rto_services_status ON rto_services(status);
CREATE INDEX IF NOT EXISTS idx_rto_services_due_date ON rto_services(due_date);

-- =============================================================
-- FINANCE
-- =============================================================

CREATE TABLE IF NOT EXISTS finance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE RESTRICT,
    policy_id UUID REFERENCES policies(id) ON DELETE RESTRICT,
    loan_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    interest_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
    emi NUMERIC(12,2) NOT NULL DEFAULT 0,
    tenure_months INTEGER NOT NULL DEFAULT 0,
    finance_company VARCHAR(150),
    disbursement_date DATE,
    outstanding_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'active' CHECK (status IN ('active','closed','defaulted','pending')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_finance_org_branch ON finance_records(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_finance_customer ON finance_records(customer_id);
CREATE INDEX IF NOT EXISTS idx_finance_status ON finance_records(status);

-- =============================================================
-- LEADS
-- =============================================================

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    lead_source VARCHAR(100),
    campaign VARCHAR(150),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    assigned_to UUID REFERENCES users(id) ON DELETE RESTRICT,
    status VARCHAR(40) NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','converted','closed','lost','archived')),
    priority VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low','medium','high','urgent')),
    expected_premium NUMERIC(12,2) NOT NULL DEFAULT 0,
    next_follow_up_date DATE,
    remarks TEXT,
    search_vector TSVECTOR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_org_branch ON leads(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_search ON leads USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_leads_next_follow_up ON leads(next_follow_up_date);

-- =============================================================
-- FOLLOW UPS
-- =============================================================

CREATE TABLE IF NOT EXISTS follow_ups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    lead_id UUID REFERENCES leads(id) ON DELETE RESTRICT,
    follow_up_date DATE NOT NULL,
    follow_up_time TIME,
    call_done BOOLEAN NOT NULL DEFAULT FALSE,
    whatsapp_sent BOOLEAN NOT NULL DEFAULT FALSE,
    visit_done BOOLEAN NOT NULL DEFAULT FALSE,
    meeting_done BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,
    reminder_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_follow_ups_org_branch ON follow_ups(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_follow_ups_customer ON follow_ups(customer_id);
CREATE INDEX IF NOT EXISTS idx_follow_ups_lead ON follow_ups(lead_id);
CREATE INDEX IF NOT EXISTS idx_follow_ups_reminder ON follow_ups(reminder_at);

-- =============================================================
-- PAYMENTS
-- =============================================================

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    receipt_number VARCHAR(100) NOT NULL UNIQUE,
    invoice_number VARCHAR(100) NOT NULL UNIQUE,
    payment_mode VARCHAR(40) NOT NULL CHECK (payment_mode IN ('cash','cheque','upi','bank_transfer','card')),
    cash_received BOOLEAN NOT NULL DEFAULT FALSE,
    cheque_number VARCHAR(100),
    upi_reference VARCHAR(100),
    bank_name VARCHAR(150),
    card_last4 VARCHAR(4),
    amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    gst NUMERIC(12,2) NOT NULL DEFAULT 0,
    balance NUMERIC(12,2) NOT NULL DEFAULT 0,
    payment_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_payments_org_branch ON payments(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_payments_mode ON payments(payment_mode);

-- =============================================================
-- EXPENSES
-- =============================================================

CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    expense_category VARCHAR(100) NOT NULL,
    amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    vendor_name VARCHAR(255),
    gst NUMERIC(12,2) NOT NULL DEFAULT 0,
    employee_id UUID REFERENCES users(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_expenses_org_branch ON expenses(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_expenses_employee ON expenses(employee_id);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(expense_category);

-- =============================================================
-- COMMISSIONS
-- =============================================================

CREATE TABLE IF NOT EXISTS commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    insurance_company_id UUID NOT NULL REFERENCES insurance_companies(id) ON DELETE RESTRICT,
    policy_id UUID NOT NULL REFERENCES policies(id) ON DELETE RESTRICT,
    executive_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    commission_pct NUMERIC(5,2) NOT NULL DEFAULT 0,
    commission_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    received_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    pending_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_commissions_org_branch ON commissions(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_commissions_policy ON commissions(policy_id);
CREATE INDEX IF NOT EXISTS idx_commissions_executive ON commissions(executive_id);

-- =============================================================
-- RENEWALS
-- =============================================================

CREATE TABLE IF NOT EXISTS renewals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    policy_id UUID NOT NULL REFERENCES policies(id) ON DELETE RESTRICT,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
    due_date DATE NOT NULL,
    reminder_1_date DATE,
    reminder_2_date DATE,
    reminder_3_date DATE,
    whatsapp_sent BOOLEAN NOT NULL DEFAULT FALSE,
    sms_sent BOOLEAN NOT NULL DEFAULT FALSE,
    email_sent BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','in_progress','completed','cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_renewals_org_branch ON renewals(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_renewals_policy ON renewals(policy_id);
CREATE INDEX IF NOT EXISTS idx_renewals_due_date ON renewals(due_date);
CREATE INDEX IF NOT EXISTS idx_renewals_status ON renewals(status);

-- =============================================================
-- DOCUMENT MANAGEMENT
-- =============================================================

CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    customer_id UUID REFERENCES customers(id) ON DELETE RESTRICT,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE RESTRICT,
    policy_id UUID REFERENCES policies(id) ON DELETE RESTRICT,
    document_type VARCHAR(60) NOT NULL CHECK (document_type IN ('rc','insurance','puc','fitness','permit','pan','aadhaar','gst','loan_documents','other')),
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    description TEXT,
    uploaded_by UUID REFERENCES users(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_documents_org_branch ON documents(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(document_type);
CREATE INDEX IF NOT EXISTS idx_documents_customer ON documents(customer_id);

-- =============================================================
-- WHATSAPP REMINDER LOGS
-- =============================================================

CREATE TABLE IF NOT EXISTS whatsapp_reminder_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    template_name VARCHAR(150),
    message_text TEXT,
    delivery_status VARCHAR(40) NOT NULL DEFAULT 'pending' CHECK (delivery_status IN ('pending','sent','delivered','failed','read')),
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
) PARTITION BY RANGE (sent_at);

CREATE TABLE IF NOT EXISTS whatsapp_reminder_logs_2026 PARTITION OF whatsapp_reminder_logs
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

CREATE TABLE IF NOT EXISTS whatsapp_reminder_logs_2027 PARTITION OF whatsapp_reminder_logs
    FOR VALUES FROM ('2027-01-01') TO ('2028-01-01');

CREATE INDEX IF NOT EXISTS idx_whatsapp_logs_org_branch ON whatsapp_reminder_logs(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_logs_customer ON whatsapp_reminder_logs(customer_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_logs_status ON whatsapp_reminder_logs(delivery_status);

-- =============================================================
-- ACTIVITY LOGS
-- =============================================================

CREATE TABLE IF NOT EXISTS activity_logs (
    id BIGSERIAL PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    branch_id UUID REFERENCES branches(id) ON DELETE RESTRICT,
    action_type VARCHAR(40) NOT NULL CHECK (action_type IN ('login','logout','insert','update','delete')),
    action_detail TEXT,
    ip_address INET,
    browser_info TEXT,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (created_at);

CREATE TABLE IF NOT EXISTS activity_logs_2026 PARTITION OF activity_logs
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

CREATE TABLE IF NOT EXISTS activity_logs_2027 PARTITION OF activity_logs
    FOR VALUES FROM ('2027-01-01') TO ('2028-01-01');

CREATE INDEX IF NOT EXISTS idx_activity_logs_org_branch ON activity_logs(organization_id, branch_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_type ON activity_logs(action_type);

-- =============================================================
-- TRIGGERS AND FUNCTIONS
-- =============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_customer_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := TO_TSVECTOR(
        'simple',
        COALESCE(NEW.name, '') || ' ' ||
        COALESCE(NEW.mobile, '') || ' ' ||
        COALESCE(NEW.email, '') || ' ' ||
        COALESCE(NEW.company_name, '') || ' ' ||
        COALESCE(NEW.remarks, '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_vehicle_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := TO_TSVECTOR(
        'simple',
        COALESCE(NEW.registration_number, '') || ' ' ||
        COALESCE(NEW.chassis_number, '') || ' ' ||
        COALESCE(NEW.engine_number, '') || ' ' ||
        COALESCE(NEW.manufacturer, '') || ' ' ||
        COALESCE(NEW.model, '') || ' ' ||
        COALESCE(NEW.variant, '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_policy_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := TO_TSVECTOR(
        'simple',
        COALESCE(NEW.policy_number, '') || ' ' ||
        COALESCE(NEW.policy_package, '') || ' ' ||
        COALESCE(NEW.nominee_name, '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_lead_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := TO_TSVECTOR(
        'simple',
        COALESCE(NEW.remarks, '') || ' ' ||
        COALESCE(NEW.campaign, '') || ' ' ||
        COALESCE(NEW.lead_source, '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_claim_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := TO_TSVECTOR(
        'simple',
        COALESCE(NEW.claim_number, '') || ' ' ||
        COALESCE(NEW.surveyor_name, '') || ' ' ||
        COALESCE(NEW.garage_name, '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_vehicles_updated_at BEFORE UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_policies_updated_at BEFORE UPDATE ON policies
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_claims_updated_at BEFORE UPDATE ON claims
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_customers_search_vector BEFORE INSERT OR UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION set_customer_search_vector();

CREATE TRIGGER trg_vehicles_search_vector BEFORE INSERT OR UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION set_vehicle_search_vector();

CREATE TRIGGER trg_policies_search_vector BEFORE INSERT OR UPDATE ON policies
    FOR EACH ROW EXECUTE FUNCTION set_policy_search_vector();

CREATE TRIGGER trg_leads_search_vector BEFORE INSERT OR UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION set_lead_search_vector();

CREATE TRIGGER trg_claims_search_vector BEFORE INSERT OR UPDATE ON claims
    FOR EACH ROW EXECUTE FUNCTION set_claim_search_vector();

-- =============================================================
-- STORED PROCEDURES
-- =============================================================

CREATE OR REPLACE PROCEDURE create_customer_vehicle(
    p_organization_id UUID,
    p_branch_id UUID,
    p_created_by UUID,
    p_customer_type VARCHAR,
    p_customer_name VARCHAR,
    p_mobile VARCHAR,
    p_email VARCHAR,
    p_vehicle_registration VARCHAR,
    p_vehicle_type VARCHAR,
    p_manufacturer VARCHAR,
    p_model VARCHAR,
    OUT p_customer_id UUID,
    OUT p_vehicle_id UUID
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO customers (
        organization_id,
        branch_id,
        customer_type,
        name,
        mobile,
        email,
        created_by
    ) VALUES (
        p_organization_id,
        p_branch_id,
        p_customer_type,
        p_customer_name,
        p_mobile,
        p_email,
        p_created_by
    ) RETURNING id INTO p_customer_id;

    INSERT INTO vehicles (
        organization_id,
        branch_id,
        customer_id,
        registration_number,
        vehicle_type,
        manufacturer,
        model,
        created_by
    ) VALUES (
        p_organization_id,
        p_branch_id,
        p_customer_id,
        p_vehicle_registration,
        p_vehicle_type,
        p_manufacturer,
        p_model,
        p_created_by
    ) RETURNING id INTO p_vehicle_id;
END;
$$;

CREATE OR REPLACE PROCEDURE archive_inactive_leads(p_days INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE leads
    SET status = 'archived', updated_at = NOW()
    WHERE next_follow_up_date < CURRENT_DATE - p_days
      AND status NOT IN ('converted', 'closed', 'lost');
END;
$$;

-- =============================================================
-- FUNCTIONS
-- =============================================================

CREATE OR REPLACE FUNCTION policy_age_days(p_policy_id UUID)
RETURNS INTEGER AS $$
DECLARE
    v_start_date DATE;
BEGIN
    SELECT start_date INTO v_start_date FROM policies WHERE id = p_policy_id;
    RETURN COALESCE(DATE_PART('day', CURRENT_DATE - v_start_date)::INTEGER, 0);
END;
$$ LANGUAGE plpgsql;

-- =============================================================
-- VIEWS
-- =============================================================

CREATE OR REPLACE VIEW vw_customer_policy_summary AS
SELECT
    c.id AS customer_id,
    c.name AS customer_name,
    c.mobile,
    COUNT(DISTINCT p.id) AS policy_count,
    COALESCE(SUM(p.net_premium), 0) AS total_net_premium
FROM customers c
LEFT JOIN policies p ON p.customer_id = c.id AND p.is_deleted = FALSE
WHERE c.is_deleted = FALSE
GROUP BY c.id, c.name, c.mobile;

CREATE OR REPLACE VIEW vw_lead_pipeline AS
SELECT
    l.id AS lead_id,
    c.name AS customer_name,
    l.status,
    l.priority,
    l.expected_premium,
    l.next_follow_up_date,
    u.name AS assigned_to_name
FROM leads l
JOIN customers c ON c.id = l.customer_id
LEFT JOIN users u ON u.id = l.assigned_to
WHERE l.is_deleted = FALSE;

-- =============================================================
-- MATERIALIZED VIEWS
-- =============================================================

CREATE MATERIALIZED VIEW IF NOT EXISTS mv_policy_dashboard AS
SELECT
    organization_id,
    status,
    COUNT(*) AS policy_count,
    SUM(net_premium) AS total_net_premium,
    SUM(gst) AS total_gst
FROM policies
WHERE is_deleted = FALSE
GROUP BY organization_id, status;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_policy_dashboard_org_status
    ON mv_policy_dashboard(organization_id, status);

CREATE MATERIALIZED VIEW IF NOT EXISTS mv_renewal_dashboard AS
SELECT
    organization_id,
    status,
    COUNT(*) AS renewal_count,
    MIN(due_date) AS earliest_due_date
FROM renewals
WHERE is_deleted = FALSE
GROUP BY organization_id, status;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_renewal_dashboard_org_status
    ON mv_renewal_dashboard(organization_id, status);

-- =============================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE rto_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE renewals ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_reminder_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY org_access ON organizations
    FOR ALL USING (id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY branch_access ON branches
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY user_access ON users
    FOR ALL USING (id = auth.uid() OR organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY customer_access ON customers
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY vehicle_access ON vehicles
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY company_access ON insurance_companies
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY policy_access ON policies
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY quotation_access ON live_quotations
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY claim_access ON claims
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY rto_access ON rto_services
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY finance_access ON finance_records
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY lead_access ON leads
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY follow_up_access ON follow_ups
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY payment_access ON payments
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY expense_access ON expenses
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY commission_access ON commissions
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY renewal_access ON renewals
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY document_access ON documents
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY whatsapp_access ON whatsapp_reminder_logs
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY activity_access ON activity_logs
    FOR ALL USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

-- =============================================================
-- PERFORMANCE OPTIMIZATION AND SEARCH STRATEGIES
-- =============================================================

CREATE INDEX IF NOT EXISTS idx_customers_trgm_name ON customers USING GIN (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_customers_trgm_company ON customers USING GIN (company_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_vehicles_trgm_reg ON vehicles USING GIN (registration_number gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_policies_trgm_num ON policies USING GIN (policy_number gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_claims_trgm_num ON claims USING GIN (claim_number gin_trgm_ops);

-- =============================================================
-- FULL TEXT SEARCH EXAMPLE
-- =============================================================

-- Example query:
-- SELECT * FROM customers WHERE search_vector @@ plainto_tsquery('simple', 'balaji');

-- =============================================================
-- BACKUP STRATEGY (PRODUCTION)
-- =============================================================

-- Recommended Supabase / PostgreSQL production backups:
-- 1. Enable PITR (Point-In-Time Recovery) in Supabase.
-- 2. Use daily logical backups:
--    pg_dump --format=custom --no-owner --no-privileges -d "$DATABASE_URL" > backup.dump
-- 3. Use WAL archiving and retention policies for RPO/RTO objectives.
-- 4. Schedule weekly full backups and daily incremental backups.

-- =============================================================
-- SAMPLE SEED (OPTIONAL)
-- =============================================================

-- INSERT INTO organizations (company_name, company_code, gst_number, pan_number, phone, email, created_by)
-- VALUES ('BALAJI POLICY MATRIX LLP', 'BALAJI001', '27AABCU9603R1ZV', 'AABCU9603R', '9998183094', 'support@balajiinsure.com', null);
