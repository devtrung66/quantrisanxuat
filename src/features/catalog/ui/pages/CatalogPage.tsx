import { useState } from "react";
import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Spinner, EmptyState, Button } from "@shared/index";
import { CATALOG_TAB, CATALOG_TAB_LABEL } from "../../model/constants";
import type { CatalogTab } from "../../model/constants";
import { useCatalogList } from "../../hooks/useCatalogList";
import { useCatalogMutation } from "../../hooks/useCatalogMutation";
import { CatalogTabs } from "../components/CatalogTabs";
import { ProductTable } from "../modules/ProductTable";
import { CustomerTable } from "../modules/CustomerTable";
import { DefectTypeTable } from "../modules/DefectTypeTable";
import { CatalogForm } from "../modules/CatalogForm";
import type { CatalogItem, Product, Customer, DefectType } from "../../model/types";

export function CatalogPage() {
  const [tab, setTab] = useState<CatalogTab>(CATALOG_TAB.product);
  const { data, isLoading } = useCatalogList(tab);
  const { create, update, remove } = useCatalogMutation(tab);

  const [editing, setEditing] = useState<CatalogItem | null>(null);
  const [creating, setCreating] = useState(false);
  const showForm = creating || !!editing;

  const switchTab = (t: CatalogTab) => { setTab(t); setEditing(null); setCreating(false); };

  const onSubmit = (v: any) => {
    if (creating) create.mutate(v, { onSuccess: () => setCreating(false) });
    else if (editing) update.mutate({ id: (editing as any).id, values: v }, { onSuccess: () => setEditing(null) });
  };

  const onDelete = (item: CatalogItem) => {
    if (confirm(`Xoá "${(item as any).name}"?`)) remove.mutate((item as any).id);
  };

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <CatalogTabs value={tab} onChange={switchTab} />
          <Button onClick={() => { setCreating(true); setEditing(null); }}>+ Thêm {CATALOG_TAB_LABEL[tab].toLowerCase()}</Button>
        </div>

        {showForm && (
          <Card title={creating ? `Thêm ${CATALOG_TAB_LABEL[tab].toLowerCase()}` : `Sửa ${CATALOG_TAB_LABEL[tab].toLowerCase()}`}>
            <CatalogForm
              tab={tab}
              initial={editing ?? undefined}
              submitting={create.isPending || update.isPending}
              onSubmit={onSubmit}
              onCancel={() => { setCreating(false); setEditing(null); }}
            />
          </Card>
        )}

        <Card>
          {isLoading || !data ? (
            <Spinner />
          ) : data.length === 0 ? (
            <EmptyState />
          ) : tab === CATALOG_TAB.product ? (
            <ProductTable data={data as Product[]} onEdit={setEditing} onDelete={onDelete} />
          ) : tab === CATALOG_TAB.customer ? (
            <CustomerTable data={data as Customer[]} onEdit={setEditing} onDelete={onDelete} />
          ) : (
            <DefectTypeTable data={data as DefectType[]} onEdit={setEditing} onDelete={onDelete} />
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
