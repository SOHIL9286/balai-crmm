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
