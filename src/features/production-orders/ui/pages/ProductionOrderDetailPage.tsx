import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Spinner, EmptyState, Card, Button } from "@shared/index";
import {
  useProductionOrderDetail, useLsxComments, useAddComment,
} from "../../hooks/useProductionOrderDetail";
import { useMaterialNorm } from "../../hooks/useMaterialNorm";
import { LSX_SECTION } from "../../model/constants";
import type { LsxSection } from "../../model/constants";
import { LsxSidebar } from "../components/LsxSidebar";
import { LsxGeneralInfo } from "../modules/LsxGeneralInfo";
import { MaterialNormTable } from "../modules/MaterialNormTable";
import { PlanSxctSection } from "../modules/PlanSxctSection";
import { LinksSection } from "../modules/LinksSection";
import { SystemInfoSection } from "../modules/SystemInfoSection";
import { ProcessSection } from "../modules/ProcessSection";
import { TasksSection } from "../modules/TasksSection";
import { LsxCommentBox } from "../modules/LsxCommentBox";

// thứ tự section trong trang (để scroll-spy)
const SECTION_ORDER: LsxSection[] = [
  LSX_SECTION.general,
  LSX_SECTION.norm,
  LSX_SECTION.planSxct,
  LSX_SECTION.links,
  LSX_SECTION.system,
  LSX_SECTION.process,
  LSX_SECTION.tasks,
];

export function ProductionOrderDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { data: po, isLoading } = useProductionOrderDetail(id);
  const norm = useMaterialNorm(id);
  const comments = useLsxComments(id);
  const addComment = useAddComment(id ?? "");

  const [active, setActive] = useState<LsxSection>(LSX_SECTION.general);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const clickLock = useRef(false);

  const jump = useCallback((sec: LsxSection) => {
    const el = sectionRefs.current[sec];
    if (!el) return;
    clickLock.current = true;
    setActive(sec);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => { clickLock.current = false; }, 600);
  }, []);

  // scroll-spy: section nào gần đỉnh viewport nhất thì active
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const onScroll = () => {
      if (clickLock.current) return;
      const top = root.getBoundingClientRect().top + 120;
      let current = SECTION_ORDER[0];
      for (const sec of SECTION_ORDER) {
        const el = sectionRefs.current[sec];
        if (el && el.getBoundingClientRect().top <= top) current = sec;
      }
      setActive(current);
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => root.removeEventListener("scroll", onScroll);
  }, [po]);

  if (isLoading) return <PageContainer><Spinner /></PageContainer>;
  if (!po) {
    return (
      <PageContainer>
        <Card><EmptyState text="Không tìm thấy lệnh sản xuất" /></Card>
      </PageContainer>
    );
  }

  const setRef = (sec: LsxSection) => (el: HTMLDivElement | null) => {
    sectionRefs.current[sec] = el;
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header LSX */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-xl font-bold text-slate-800">{po.code}</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => nav("/production-orders")} aria-label="Đóng">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Thân: sidebar + nội dung cuộn */}
      <div className="flex min-h-0 flex-1 bg-white">
        <LsxSidebar active={active} onJump={jump} />

        <div ref={scrollRef} className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-8 py-6">
            <div ref={setRef(LSX_SECTION.general)} className="scroll-mt-6">
              <LsxGeneralInfo po={po} />
            </div>

            <div ref={setRef(LSX_SECTION.norm)} className="scroll-mt-6 pt-10">
              <MaterialNormTable data={norm.data} isLoading={norm.isLoading} />
            </div>

            <div ref={setRef(LSX_SECTION.planSxct)} className="scroll-mt-6 pt-10">
              <PlanSxctSection allocations={po.allocations} />
            </div>

            <div ref={setRef(LSX_SECTION.links)} className="scroll-mt-6 pt-10">
              <LinksSection links={po.links ?? []} />
            </div>

            <div ref={setRef(LSX_SECTION.system)} className="scroll-mt-6 pt-10">
              <SystemInfoSection info={po.system} />
            </div>

            <div ref={setRef(LSX_SECTION.process)} className="scroll-mt-6 pt-10">
              <ProcessSection steps={po.process ?? []} />
            </div>

            <div ref={setRef(LSX_SECTION.tasks)} className="scroll-mt-6 pt-10">
              <TasksSection tasks={po.tasks ?? []} />
            </div>

            <div className="pt-10">
              <LsxCommentBox
                comments={comments.data}
                isLoading={comments.isLoading}
                submitting={addComment.isPending}
                onSend={(c) => addComment.mutate(c)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
