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
