import { useState } from "react";
import { AtSign, Paperclip, Send, User } from "lucide-react";
import { Spinner } from "@shared/index";
import type { Comment } from "../../model/types";

function timeAgo(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())} ${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function Avatar({ text }: { text?: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
      {text ? text.slice(0, 1).toUpperCase() : <User className="h-4 w-4" />}
    </span>
  );
}

export function LsxCommentBox({
  comments, isLoading, submitting, onSend,
}: {
  comments: Comment[] | undefined;
  isLoading: boolean;
  submitting?: boolean;
  onSend: (content: string) => void;
}) {
  const [text, setText] = useState("");

  const send = () => {
    const v = text.trim();
    if (!v) return;
    onSend(v);
    setText("");
  };

  return (
    <section className="border-t border-slate-100 pt-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-700">Cộng tác</h3>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="space-y-4">
          {(comments ?? []).map((c) => (
            <div key={c.id} className="flex gap-3">
              <Avatar text={c.avatar ?? c.author} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-slate-800">{c.author}</span>
                  <span className="text-xs text-slate-400">{timeAgo(c.createdAt)}</span>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">{c.content}</p>
              </div>
            </div>
          ))}
          {(comments ?? []).length === 0 && (
            <p className="text-sm text-slate-400">Chưa có bình luận. Bắt đầu trao đổi bên dưới.</p>
          )}
        </div>
      )}

      <div className="mt-5 flex items-start gap-3">
        <Avatar text="A" />
        <div className="flex-1 rounded-lg border border-slate-200 focus-within:border-blue-400">
          <textarea
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send(); }}
            placeholder="Bình luận..."
            className="w-full resize-none rounded-t-lg px-3 py-2 text-sm outline-none"
          />
          <div className="flex items-center justify-between px-3 py-1.5">
            <div className="flex items-center gap-1">
              <button className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label="Nhắc tên"><AtSign className="h-4 w-4" /></button>
              <button className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label="Đính kèm"><Paperclip className="h-4 w-4" /></button>
            </div>
            <button
              onClick={send}
              disabled={submitting || !text.trim()}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" /> Gửi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
