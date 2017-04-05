export function mapOid(item) {
    const { _id: { $oid }, ...rest } = item;
    return { ...{ _id: $oid }, ...rest };
}