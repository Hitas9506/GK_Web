"use client";

import { useEffect, useState } from "react";
import { ShippingInfo } from "@/lib/types";
import { provinceNames, getDistricts, getWards } from "@/lib/vietnam-divisions";

const inputCls: React.CSSProperties = {
  width: "100%",
  padding: "0.68rem 0.9rem",
  borderRadius: "9px",
  border: "2px solid var(--color-border)",
  fontSize: "0.88rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border 0.2s",
  background: "white",
};

const selectCls: React.CSSProperties = {
  ...inputCls,
  cursor: "pointer",
  appearance: "auto",
};

const disabledSelectCls: React.CSSProperties = {
  ...selectCls,
  background: "var(--color-muted)",
  color: "var(--color-text-muted)",
  cursor: "not-allowed",
  opacity: 0.7,
};

const labelCls: React.CSSProperties = {
  display: "block",
  fontSize: "0.82rem",
  fontWeight: 600,
  marginBottom: "0.35rem",
};

interface Props {
  value: ShippingInfo;
  onChange: (info: ShippingInfo) => void;
  /** If true, renders a more compact 2-column layout */
  compact?: boolean;
}

export default function ShippingForm({ value, onChange, compact = false }: Props) {
  const [districts, setDistricts] = useState<string[]>([]);
  const [wards, setWards]         = useState<string[]>([]);

  /* When city changes → reload district list, reset district & ward */
  useEffect(() => {
    if (!value.city) {
      setDistricts([]);
      setWards([]);
      return;
    }
    const list = getDistricts(value.city).map((d) => d.name);
    setDistricts(list);
    // Reset downstream only when city changes
    if (!list.includes(value.district)) {
      onChange({ ...value, district: "", ward: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.city]);

  /* When district changes → reload ward list, reset ward */
  useEffect(() => {
    if (!value.city || !value.district) {
      setWards([]);
      return;
    }
    const list = getWards(value.city, value.district).map((w) => w.name);
    setWards(list);
    if (!list.includes(value.ward)) {
      onChange({ ...value, ward: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.district]);

  const set = (patch: Partial<ShippingInfo>) => onChange({ ...value, ...patch });

  const withFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
    (e.target.style.border = "2px solid var(--color-primary)");
  const withBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
    (e.target.style.border = "2px solid var(--color-border)");

  const gridCols = compact ? "1fr 1fr" : "1fr 1fr";

  return (
    <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: "1rem" }}>

      {/* Họ tên */}
      <div>
        <label style={labelCls}>Họ tên người nhận *</label>
        <input
          value={value.fullName}
          onChange={(e) => set({ fullName: e.target.value })}
          placeholder="Nguyễn Văn A"
          style={inputCls}
          onFocus={withFocus} onBlur={withBlur}
        />
      </div>

      {/* Số điện thoại */}
      <div>
        <label style={labelCls}>Số điện thoại *</label>
        <input
          value={value.phone}
          onChange={(e) => set({ phone: e.target.value })}
          placeholder="0901234567"
          style={inputCls}
          onFocus={withFocus} onBlur={withBlur}
        />
      </div>

      {/* Địa chỉ – full width */}
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={labelCls}>Địa chỉ (số nhà, đường) *</label>
        <input
          value={value.address}
          onChange={(e) => set({ address: e.target.value })}
          placeholder="123 Đường Lê Lợi"
          style={inputCls}
          onFocus={withFocus} onBlur={withBlur}
        />
      </div>

      {/* Tỉnh / Thành phố – full width, chọn trước */}
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={labelCls}>Tỉnh / Thành phố *</label>
        <select
          value={value.city}
          onChange={(e) => set({ city: e.target.value, district: "", ward: "" })}
          style={selectCls}
          onFocus={withFocus} onBlur={withBlur}
        >
          <option value="">-- Chọn tỉnh / thành phố --</option>
          {provinceNames.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Quận / Huyện */}
      <div>
        <label style={labelCls}>Quận / Huyện *</label>
        <select
          value={value.district}
          onChange={(e) => set({ district: e.target.value, ward: "" })}
          style={value.city ? selectCls : disabledSelectCls}
          disabled={!value.city}
          onFocus={withFocus} onBlur={withBlur}
        >
          <option value="">{value.city ? "-- Chọn quận / huyện --" : "-- Chọn tỉnh trước --"}</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Phường / Xã */}
      <div>
        <label style={labelCls}>Phường / Xã *</label>
        <select
          value={value.ward}
          onChange={(e) => set({ ward: e.target.value })}
          style={value.district ? selectCls : disabledSelectCls}
          disabled={!value.district}
          onFocus={withFocus} onBlur={withBlur}
        >
          <option value="">{value.district ? "-- Chọn phường / xã --" : "-- Chọn quận trước --"}</option>
          {wards.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
