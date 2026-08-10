export function EmptyState({ text = "Chưa có dữ liệu" }: { text?: string }) {
  return <div className="py-10 text-center text-sm text-slate-400">{text}</div>;
}
