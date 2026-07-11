# Supabase Configuration

## Storage Buckets

Create the following storage buckets:

- documents
- policy-pdfs
- rc-uploads
- customer-photos
- vehicle-images
- claim-documents

## Storage Policies

Example policy for documents bucket:

```sql
create policy "Allow authenticated users to upload documents"
on public.objects
for insert
to authenticated
with check (bucket_id = 'documents');
```

## Auth Integration

- Enable email/password auth.
- Configure JWT custom claims for organization and branch access.
- Use Supabase Auth users as the source for created_by and updated_by audit fields.

## Realtime

Enable realtime for:
- policies
- claims
- leads
- renewals
- payments

## RLS Recommendations

- Use organization_id membership checks for every tenant table.
- Restrict updates to the owning branch and role.
- Apply separate policies for admin, manager and executive roles.
