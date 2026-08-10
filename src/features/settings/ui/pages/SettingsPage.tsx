import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Spinner } from "@shared/index";
import { User, SlidersHorizontal } from "lucide-react";
import { useSettings } from "../../hooks/useSettings";
import { useUpdateProfile, useUpdatePreferences } from "../../hooks/useSettingsMutation";
import { ProfileForm } from "../modules/ProfileForm";
import { PreferencesForm } from "../modules/PreferencesForm";
import type { ProfileValues, PreferenceValues } from "../../model/types";

export function SettingsPage() {
  const { data, isLoading } = useSettings();
  const updateProfile = useUpdateProfile();
  const updatePrefs = useUpdatePreferences();

  if (isLoading || !data) return <PageContainer><Spinner /></PageContainer>;

  const onProfile = (v: ProfileValues) => updateProfile.mutate(v);
  const onPrefs = (v: PreferenceValues) => updatePrefs.mutate(v);

  return (
    <PageContainer>
      <div className="max-w-3xl space-y-6">
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><User className="h-5 w-5" /></span>
            <div>
              <h3 className="text-base font-semibold text-slate-800">Hồ sơ</h3>
              <p className="text-xs text-slate-400">Thông tin tài khoản quản trị</p>
            </div>
          </div>
          <ProfileForm
            initial={data.profile}
            submitting={updateProfile.isPending}
            saved={updateProfile.isSuccess}
            onSubmit={onProfile}
          />
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><SlidersHorizontal className="h-5 w-5" /></span>
            <div>
              <h3 className="text-base font-semibold text-slate-800">Tuỳ chọn hệ thống</h3>
              <p className="text-xs text-slate-400">Giao diện, ngôn ngữ và cảnh báo</p>
            </div>
          </div>
          <PreferencesForm
            initial={data.preferences}
            submitting={updatePrefs.isPending}
            saved={updatePrefs.isSuccess}
            onSubmit={onPrefs}
          />
        </Card>
      </div>
    </PageContainer>
  );
}
