-- Supabase Storage configuration SQL
-- Create buckets via Supabase Dashboard or storage API.

-- Example SQL for bucket creation is not always supported directly in Postgres.
-- Recommended buckets:
-- documents
-- policy-pdfs
-- rc-uploads
-- customer-photos
-- vehicle-images
-- claim-documents

-- Example policies (to be applied in Supabase SQL editor after bucket creation):

-- create policy "documents_insert" on storage.objects for insert to authenticated with check (bucket_id = 'documents');
-- create policy "documents_select" on storage.objects for select to authenticated using (bucket_id = 'documents');
-- create policy "documents_update" on storage.objects for update to authenticated using (bucket_id = 'documents');
-- create policy "documents_delete" on storage.objects for delete to authenticated using (bucket_id = 'documents');
