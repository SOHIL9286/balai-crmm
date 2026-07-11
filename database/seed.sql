-- =============================================================
-- SEED DATA FOR BALAJI POLICY MATRIX LLP
-- =============================================================

INSERT INTO organizations (id, company_name, company_code, gst_number, pan_number, address, city, state, pincode, phone, email) VALUES
('11111111-1111-1111-1111-111111111111', 'BALAJI POLICY MATRIX LLP', 'BALAJI001', '27AABCU9603R1ZV', 'AABCU9603R', 'B-204, Silver Plaza', 'Ahmedabad', 'Gujarat', '380015', '9998183094', 'support@balajiinsure.com');

INSERT INTO branches (id, organization_id, branch_name, branch_code, city, state, phone, email) VALUES
('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Ahmedabad Main', 'AHM', 'Ahmedabad', 'Gujarat', '07940112233', 'ahm@balajiinsure.com'),
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Surat', 'ST', 'Surat', 'Gujarat', '02612233445', 'surat@balajiinsure.com');

INSERT INTO users (id, organization_id, branch_id, employee_code, name, mobile, email, password_hash, role, department, status)
VALUES
('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'EMP001', 'Sahil Mansuri', '9876543210', 'sahil@balajiinsure.com', 'dummy_hash_01', 'admin', 'Operations', 'active'),
('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'EMP002', 'Nirav Shah', '9876543211', 'nirav@balajiinsure.com', 'dummy_hash_02', 'manager', 'Sales', 'active');

-- 10 insurance companies
INSERT INTO insurance_companies (id, organization_id, company_name, short_name, portal_url, api_url, agent_code, branch_code, status)
VALUES
('66666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 'ICICI Lombard', 'ICICI', 'https://www.icicilombard.com', 'https://api.icicilombard.example', 'AG001', 'BR001', 'active'),
('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'TATA AIG', 'TATA', 'https://www.tataaig.com', 'https://api.tataaig.example', 'AG002', 'BR002', 'active'),
('88888888-8888-8888-8888-888888888888', '11111111-1111-1111-1111-111111111111', 'Reliance General', 'REL', 'https://www.reliancegeneral.co.in', 'https://api.reliance.example', 'AG003', 'BR003', 'active'),
('99999999-9999-9999-9999-999999999999', '11111111-1111-1111-1111-111111111111', 'Go Digit', 'DIGIT', 'https://www.godigit.com', 'https://api.godigit.example', 'AG004', 'BR004', 'active'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Bajaj Allianz', 'BAJAJ', 'https://www.bajajallianz.com', 'https://api.bajaj.example', 'AG005', 'BR005', 'active'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'HDFC ERGO', 'HDFC', 'https://www.hdfcergo.com', 'https://api.hdfcergo.example', 'AG006', 'BR006', 'active'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 'Shriram General', 'SHR', 'https://www.shriramgi.com', 'https://api.shriram.example', 'AG007', 'BR007', 'active'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 'Future Generali', 'FG', 'https://www.futuregenerali.in', 'https://api.futuregenerali.example', 'AG008', 'BR008', 'active'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'Oriental Insurance', 'ORIENT', 'https://www.orientalinsurance.org.in', 'https://api.oriental.example', 'AG009', 'BR009', 'active'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '11111111-1111-1111-1111-111111111111', 'United India', 'UI', 'https://www.uiic.co.in', 'https://api.uiic.example', 'AG010', 'BR010', 'active');

-- Seed 100 customers
WITH names(name, mobile, email, city, pan, gst) AS (
    VALUES
    ('Ravi Patel','9876500001','ravi.patel@example.com','Ahmedabad','ABCDE1234F','27ABCDE1234F1Z2'),
    ('Mehul Shah','9876500002','mehul.shah@example.com','Surat','ABCDE1235F','27ABCDE1235F1Z2'),
    ('Asha Joshi','9876500003','asha.joshi@example.com','Vadodara','ABCDE1236F','27ABCDE1236F1Z2'),
    ('Kiran Desai','9876500004','kiran.desai@example.com','Rajkot','ABCDE1237F','27ABCDE1237F1Z2'),
    ('Nilesh Mehta','9876500005','nilesh.mehta@example.com','Bhavnagar','ABCDE1238F','27ABCDE1238F1Z2'),
    ('Pooja Trivedi','9876500006','pooja.trivedi@example.com','Jamnagar','ABCDE1239F','27ABCDE1239F1Z2'),
    ('Harsh Vyas','9876500007','harsh.vyas@example.com','Gandhinagar','ABCDE1240F','27ABCDE1240F1Z2'),
    ('Deepa Kumar','9876500008','deepa.kumar@example.com','Anand','ABCDE1241F','27ABCDE1241F1Z2'),
    ('Bhavik Rana','9876500009','bhavik.rana@example.com','Nadiad','ABCDE1242F','27ABCDE1242F1Z2'),
    ('Kavita Solanki','9876500010','kavita.solanki@example.com','Bharuch','ABCDE1243F','27ABCDE1243F1Z2')
)
INSERT INTO customers (id, organization_id, branch_id, customer_type, name, mobile, email, city, state, pan_number, gst_number, customer_status, created_by)
SELECT gen_random_uuid(), '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'individual', name, mobile, email, city, 'Gujarat', pan, gst, 'active', '44444444-4444-4444-4444-444444444444'
FROM names;

-- Additional synthetic customers
INSERT INTO customers (id, organization_id, branch_id, customer_type, name, mobile, email, city, state, pan_number, gst_number, customer_status, created_by)
SELECT gen_random_uuid(), '11111111-1111-1111-1111-111111111111', CASE WHEN i % 2 = 0 THEN '33333333-3333-3333-3333-333333333333' ELSE '22222222-2222-2222-2222-222222222222' END, 'individual', 'Customer ' || i, '9876500' || LPAD(i::text, 3, '0'), 'customer' || i || '@example.com', CASE WHEN i % 3 = 0 THEN 'Surat' WHEN i % 3 = 1 THEN 'Ahmedabad' ELSE 'Vadodara' END, 'Gujarat', 'ABCDE' || LPAD(i::text, 4, '0') || 'F', '27ABCDE' || LPAD(i::text, 4, '0') || 'F1Z2', 'active', '44444444-4444-4444-4444-444444444444'
FROM generate_series(1, 100) AS i;

-- Seed 150 vehicles
INSERT INTO vehicles (id, organization_id, branch_id, customer_id, registration_number, chassis_number, engine_number, vehicle_type, manufacturer, model, variant, fuel_type, cc, gvw, seating_capacity, registration_date, manufacturing_year, insurance_expiry, rc_status, blacklist_flag, created_by)
SELECT gen_random_uuid(), '11111111-1111-1111-1111-111111111111', CASE WHEN i % 2 = 0 THEN '33333333-3333-3333-3333-333333333333' ELSE '22222222-2222-2222-2222-222222222222' END, c.id, 'GJ' || LPAD((i % 100)::text, 2, '0') || 'AB' || LPAD(i::text, 4, '0'), 'CH' || LPAD(i::text, 6, '0'), 'ENG' || LPAD(i::text, 6, '0'), CASE WHEN i % 2 = 0 THEN 'Car' ELSE 'Bike' END, CASE WHEN i % 2 = 0 THEN 'Maruti Suzuki' ELSE 'Hero' END, CASE WHEN i % 2 = 0 THEN 'Swift' ELSE 'Splendor' END, 'ZX', CASE WHEN i % 2 = 0 THEN 'Petrol' ELSE 'Petrol' END, 1200 + (i % 5) * 100, 1500 + i, 5, CURRENT_DATE - (i % 300), 2018 + (i % 7), CURRENT_DATE + (i % 180), 'active', FALSE, '44444444-4444-4444-4444-444444444444'
FROM generate_series(1, 150) AS i
JOIN customers c ON c.id IN (SELECT id FROM customers ORDER BY created_at LIMIT 150);

-- Seed 300 policies
INSERT INTO policies (id, organization_id, branch_id, policy_number, customer_id, vehicle_id, insurance_company_id, policy_type, start_date, end_date, premium, net_premium, gst, idv, ncb, zero_dep, engine_protect, rti, consumables, roadside_assistance, status, created_by)
SELECT gen_random_uuid(), '11111111-1111-1111-1111-111111111111', CASE WHEN i % 2 = 0 THEN '33333333-3333-3333-3333-333333333333' ELSE '22222222-2222-2222-2222-222222222222' END, 'PL' || LPAD(i::text, 6, '0'), c.id, v.id, ic.id, CASE WHEN i % 4 = 0 THEN 'third_party' WHEN i % 4 = 1 THEN 'standalone_od' WHEN i % 4 = 2 THEN 'package' ELSE 'comprehensive' END, CURRENT_DATE - (i % 120), CURRENT_DATE + (i % 365), 12000 + (i % 20) * 100, 11000 + (i % 15) * 100, 1800 + (i % 5) * 100, 400000 + (i % 10) * 50000, 20 + (i % 5) * 5, i % 2 = 0, i % 3 = 0, i % 4 = 0, i % 5 = 0, i % 6 = 0, 'active', '44444444-4444-4444-4444-444444444444'
FROM generate_series(1, 300) AS i
JOIN customers c ON c.id IN (SELECT id FROM customers ORDER BY created_at LIMIT 300)
JOIN vehicles v ON v.id IN (SELECT id FROM vehicles ORDER BY created_at LIMIT 300)
JOIN insurance_companies ic ON ic.id IN (SELECT id FROM insurance_companies ORDER BY created_at LIMIT 10);

-- Seed 50 quotations
INSERT INTO live_quotations (id, organization_id, branch_id, quotation_number, customer_id, vehicle_id, insurance_company_id, premium, idv, ncb, addons, gst, final_premium, is_selected, created_by)
SELECT gen_random_uuid(), '11111111-1111-1111-1111-111111111111', CASE WHEN i % 2 = 0 THEN '33333333-3333-3333-3333-333333333333' ELSE '22222222-2222-2222-2222-222222222222' END, 'QT' || LPAD(i::text, 6, '0'), c.id, v.id, ic.id, 12000 + i, 450000 + i * 100, 20 + (i % 5) * 5, '["zero_dep","engine_protect"]'::jsonb, 1800 + i, 13800 + i, i % 2 = 0, '44444444-4444-4444-4444-444444444444'
FROM generate_series(1, 50) AS i
JOIN customers c ON c.id IN (SELECT id FROM customers ORDER BY created_at LIMIT 50)
JOIN vehicles v ON v.id IN (SELECT id FROM vehicles ORDER BY created_at LIMIT 50)
JOIN insurance_companies ic ON ic.id IN (SELECT id FROM insurance_companies ORDER BY created_at LIMIT 10);

-- Seed 50 claims
INSERT INTO claims (id, organization_id, branch_id, claim_number, policy_id, customer_id, vehicle_id, claim_type, claim_amount, surveyor_name, garage_name, status, documents, settlement_amount, created_by)
SELECT gen_random_uuid(), '11111111-1111-1111-1111-111111111111', CASE WHEN i % 2 = 0 THEN '33333333-3333-3333-3333-333333333333' ELSE '22222222-2222-2222-2222-222222222222' END, 'CL' || LPAD(i::text, 6, '0'), p.id, c.id, v.id, CASE WHEN i % 3 = 0 THEN 'own_damage' WHEN i % 3 = 1 THEN 'theft' ELSE 'third_party' END, 8000 + i * 100, 'Surveyor ' || i, 'Garage ' || i, CASE WHEN i % 4 = 0 THEN 'settled' WHEN i % 4 = 1 THEN 'approved' WHEN i % 4 = 2 THEN 'under_review' ELSE 'submitted' END, '[{"name":"claim_form.pdf"}]'::jsonb, 7000 + i * 100, '44444444-4444-4444-4444-444444444444'
FROM generate_series(1, 50) AS i
JOIN policies p ON p.id IN (SELECT id FROM policies ORDER BY created_at LIMIT 50)
JOIN customers c ON c.id IN (SELECT id FROM customers ORDER BY created_at LIMIT 50)
JOIN vehicles v ON v.id IN (SELECT id FROM vehicles ORDER BY created_at LIMIT 50);

-- Seed 200 renewals
INSERT INTO renewals (id, organization_id, branch_id, policy_id, customer_id, vehicle_id, due_date, reminder_1_date, reminder_2_date, reminder_3_date, whatsapp_sent, sms_sent, email_sent, status, created_by)
SELECT gen_random_uuid(), '11111111-1111-1111-1111-111111111111', CASE WHEN i % 2 = 0 THEN '33333333-3333-3333-3333-333333333333' ELSE '22222222-2222-2222-2222-222222222222' END, p.id, c.id, v.id, CURRENT_DATE + (i % 90), CURRENT_DATE + (i % 60), CURRENT_DATE + (i % 45), CURRENT_DATE + (i % 30), i % 2 = 0, i % 3 = 0, i % 5 = 0, CASE WHEN i % 4 = 0 THEN 'completed' WHEN i % 4 = 1 THEN 'in_progress' ELSE 'pending' END, '44444444-4444-4444-4444-444444444444'
FROM generate_series(1, 200) AS i
JOIN policies p ON p.id IN (SELECT id FROM policies ORDER BY created_at LIMIT 200)
JOIN customers c ON c.id IN (SELECT id FROM customers ORDER BY created_at LIMIT 200)
JOIN vehicles v ON v.id IN (SELECT id FROM vehicles ORDER BY created_at LIMIT 200);

-- Seed 100 leads
INSERT INTO leads (id, organization_id, branch_id, lead_source, campaign, customer_id, assigned_to, status, priority, expected_premium, next_follow_up_date, remarks, created_by)
SELECT gen_random_uuid(), '11111111-1111-1111-1111-111111111111', CASE WHEN i % 2 = 0 THEN '33333333-3333-3333-3333-333333333333' ELSE '22222222-2222-2222-2222-222222222222' END, CASE WHEN i % 3 = 0 THEN 'Website' WHEN i % 3 = 1 THEN 'Referral' ELSE 'WhatsApp' END, 'Campaign ' || i, c.id, '44444444-4444-4444-4444-444444444444', CASE WHEN i % 4 = 0 THEN 'qualified' WHEN i % 4 = 1 THEN 'contacted' WHEN i % 4 = 2 THEN 'new' ELSE 'converted' END, CASE WHEN i % 3 = 0 THEN 'high' WHEN i % 3 = 1 THEN 'medium' ELSE 'low' END, 15000 + i * 100, CURRENT_DATE + (i % 20), 'Follow-up required', '44444444-4444-4444-4444-444444444444'
FROM generate_series(1, 100) AS i
JOIN customers c ON c.id IN (SELECT id FROM customers ORDER BY created_at LIMIT 100);

-- Seed 100 follow-ups
INSERT INTO follow_ups (id, organization_id, branch_id, customer_id, lead_id, follow_up_date, follow_up_time, call_done, whatsapp_sent, visit_done, meeting_done, notes, reminder_at, created_by)
SELECT gen_random_uuid(), '11111111-1111-1111-1111-111111111111', CASE WHEN i % 2 = 0 THEN '33333333-3333-3333-3333-333333333333' ELSE '22222222-2222-2222-2222-222222222222' END, c.id, l.id, CURRENT_DATE + (i % 10), '10:00:00', i % 2 = 0, i % 3 = 0, i % 5 = 0, i % 7 = 0, 'Reminder note ' || i, CURRENT_DATE + (i % 7), '44444444-4444-4444-4444-444444444444'
FROM generate_series(1, 100) AS i
JOIN customers c ON c.id IN (SELECT id FROM customers ORDER BY created_at LIMIT 100)
JOIN leads l ON l.id IN (SELECT id FROM leads ORDER BY created_at LIMIT 100);

-- Seed 50 payments
INSERT INTO payments (id, organization_id, branch_id, receipt_number, invoice_number, payment_mode, cash_received, cheque_number, upi_reference, bank_name, card_last4, amount, gst, balance, payment_date, created_by)
SELECT gen_random_uuid(), '11111111-1111-1111-1111-111111111111', CASE WHEN i % 2 = 0 THEN '33333333-3333-3333-3333-333333333333' ELSE '22222222-2222-2222-2222-222222222222' END, 'RCPT' || LPAD(i::text, 6, '0'), 'INV' || LPAD(i::text, 6, '0'), CASE WHEN i % 4 = 0 THEN 'cash' WHEN i % 4 = 1 THEN 'upi' WHEN i % 4 = 2 THEN 'card' ELSE 'bank_transfer' END, i % 2 = 0, 'CH' || i, 'UPI' || i, 'HDFC', LPAD((i % 1000)::text, 4, '0'), 12000 + i * 100, 1800 + i * 10, 0, CURRENT_DATE - (i % 30), '44444444-4444-4444-4444-444444444444'
FROM generate_series(1, 50) AS i;

-- Seed 30 finance records
INSERT INTO finance_records (id, organization_id, branch_id, customer_id, vehicle_id, policy_id, loan_amount, interest_rate, emi, tenure_months, finance_company, disbursement_date, outstanding_amount, status, created_by)
SELECT gen_random_uuid(), '11111111-1111-1111-1111-111111111111', CASE WHEN i % 2 = 0 THEN '33333333-3333-3333-3333-333333333333' ELSE '22222222-2222-2222-2222-222222222222' END, c.id, v.id, p.id, 500000 + i * 10000, 9.5 + (i % 5), 12000 + i * 200, 24 + (i % 6), 'HDFC Bank', CURRENT_DATE - (i % 180), 250000 + i * 5000, CASE WHEN i % 3 = 0 THEN 'active' WHEN i % 3 = 1 THEN 'pending' ELSE 'closed' END, '44444444-4444-4444-4444-444444444444'
FROM generate_series(1, 30) AS i
JOIN customers c ON c.id IN (SELECT id FROM customers ORDER BY created_at LIMIT 30)
JOIN vehicles v ON v.id IN (SELECT id FROM vehicles ORDER BY created_at LIMIT 30)
JOIN policies p ON p.id IN (SELECT id FROM policies ORDER BY created_at LIMIT 30);

-- Seed 100 rto services
INSERT INTO rto_services (id, organization_id, branch_id, customer_id, vehicle_id, service_type, due_date, fee, status, notes, created_by)
SELECT gen_random_uuid(), '11111111-1111-1111-1111-111111111111', CASE WHEN i % 2 = 0 THEN '33333333-3333-3333-3333-333333333333' ELSE '22222222-2222-2222-2222-222222222222' END, c.id, v.id, CASE WHEN i % 6 = 0 THEN 'fitness' WHEN i % 6 = 1 THEN 'permit' WHEN i % 6 = 2 THEN 'road_tax' WHEN i % 6 = 3 THEN 'transfer' WHEN i % 6 = 4 THEN 'duplicate_rc' ELSE 'other' END, CURRENT_DATE + (i % 60), 500 + i * 20, CASE WHEN i % 3 = 0 THEN 'completed' WHEN i % 3 = 1 THEN 'in_progress' ELSE 'pending' END, 'RTO service request', '44444444-4444-4444-4444-444444444444'
FROM generate_series(1, 100) AS i
JOIN customers c ON c.id IN (SELECT id FROM customers ORDER BY created_at LIMIT 100)
JOIN vehicles v ON v.id IN (SELECT id FROM vehicles ORDER BY created_at LIMIT 100);

-- Seed 500 activity logs
INSERT INTO activity_logs (organization_id, branch_id, action_type, action_detail, ip_address, browser_info, user_id, created_at)
SELECT '11111111-1111-1111-1111-111111111111', CASE WHEN i % 2 = 0 THEN '33333333-3333-3333-3333-333333333333' ELSE '22222222-2222-2222-2222-222222222222' END, CASE WHEN i % 5 = 0 THEN 'login' WHEN i % 5 = 1 THEN 'logout' WHEN i % 5 = 2 THEN 'insert' WHEN i % 5 = 3 THEN 'update' ELSE 'delete' END, 'Action ' || i, '192.168.1.' || (i % 255), 'Chrome', '44444444-4444-4444-4444-444444444444', NOW() - (i || ' minutes')::interval
FROM generate_series(1, 500) AS i;
