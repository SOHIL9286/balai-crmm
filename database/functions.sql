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
    NEW.search_vector := TO_TSVECTOR('simple', COALESCE(NEW.name, '') || ' ' || COALESCE(NEW.mobile, '') || ' ' || COALESCE(NEW.email, '') || ' ' || COALESCE(NEW.company_name, '') || ' ' || COALESCE(NEW.remarks, ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_vehicle_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := TO_TSVECTOR('simple', COALESCE(NEW.registration_number, '') || ' ' || COALESCE(NEW.chassis_number, '') || ' ' || COALESCE(NEW.engine_number, '') || ' ' || COALESCE(NEW.manufacturer, '') || ' ' || COALESCE(NEW.model, ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_policy_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := TO_TSVECTOR('simple', COALESCE(NEW.policy_number, '') || ' ' || COALESCE(NEW.policy_package, '') || ' ' || COALESCE(NEW.nominee_name, ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION policy_age_days(p_policy_id UUID)
RETURNS INTEGER AS $$
DECLARE
    v_start_date DATE;
BEGIN
    SELECT start_date INTO v_start_date FROM policies WHERE id = p_policy_id;
    RETURN COALESCE(DATE_PART('day', CURRENT_DATE - v_start_date)::INTEGER, 0);
END;
$$ LANGUAGE plpgsql;

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
