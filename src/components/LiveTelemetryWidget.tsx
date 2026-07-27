import React, { useEffect, useState } from 'react';
import { TelemetryData } from '../types';
import { X, Activity, Cpu, Server, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

interface LiveTelemetryWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveTelemetryWidget: React.FC<LiveTelemetryWidgetProps> = ({ isOpen, onClose }) => {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    latency: 12,
    nodesActive: 52410,
    cpuLoad: '68.4',
    savingsRatePct: 14.2,
    monthlySavingsUSD: 1420500,
    region: 'us-west-2 · Azure Core West',
    status: 'OPTIMIZED'
  });

  const [refreshing, setRefreshing] = useState(false);

  const fetchTelemetry = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/telemetry');
      const data = await res.json();
      setTelemetry(data);
    } catch (e) {
      // Local fluctuation fallback
      setTelemetry((prev) => ({
        ...prev,
        latency: Math.round(11 + Math.random() * 3),
        cpuLoad: (65 + Math.random() * 10).toFixed(1)
      }));
    } finally {
      setTimeout(() => setRefreshing(false), 400);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      fetchTelemetry();
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="theme-card rounded-3xl max-w-xl w-full p-6 md:p-8 border border-[var(--card-border)] shadow-2xl relative font-mono-tech">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 opacity-70 hover:opacity-100 rounded-full bg-[var(--badge-bg)] border border-[var(--card-border)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-emerald-500 animate-pulse" />
          <h3 className="text-xl font-black tracking-tighter flex items-center gap-2">
            <span>AZURE_CORE_TELEMETRY · LIVE</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
          </h3>
        </div>

        {/* Region Badge */}
        <div className="bg-[var(--badge-bg)] px-4 py-2 rounded-full border border-[var(--card-border)] text-xs mb-6 flex justify-between items-center font-bold">
          <span>REGION: {telemetry.region}</span>
          <button
            onClick={fetchTelemetry}
            className="hover:opacity-80 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>SYNC</span>
          </button>
        </div>

        {/* Real-time Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[var(--badge-bg)] p-4 rounded-2xl border border-[var(--card-border)]">
            <div className="text-[10px] opacity-60 font-bold uppercase">Latency (P99)</div>
            <div className="text-2xl font-black text-[var(--text-primary)] mt-1 flex items-baseline gap-1">
              <span>{telemetry.latency}</span>
              <span className="text-xs opacity-60 font-normal">ms</span>
            </div>
            <div className="text-[10px] opacity-75 mt-1 font-bold">Sub-15ms SLA Active</div>
          </div>

          <div className="bg-[var(--badge-bg)] p-4 rounded-2xl border border-[var(--card-border)]">
            <div className="text-[10px] opacity-60 font-bold uppercase">Active Compute Pods</div>
            <div className="text-2xl font-black mt-1">
              {telemetry.nodesActive.toLocaleString()}
            </div>
            <div className="text-[10px] opacity-60 mt-1 font-bold">100% Isolation Enclave</div>
          </div>

          <div className="bg-[var(--badge-bg)] p-4 rounded-2xl border border-[var(--card-border)]">
            <div className="text-[10px] opacity-60 font-bold uppercase">CPU Core Allocation Load</div>
            <div className="text-2xl font-black mt-1 flex items-baseline gap-1">
              <span>{telemetry.cpuLoad}</span>
              <span className="text-xs opacity-60 font-normal">%</span>
            </div>
            <div className="w-full bg-[var(--card-bg)] h-1.5 rounded-full mt-2 overflow-hidden border border-[var(--card-border)]">
              <div
                className="bg-[var(--btn-main-bg)] h-full transition-all duration-500"
                style={{ width: `${telemetry.cpuLoad}%` }}
              />
            </div>
          </div>

          <div className="bg-[var(--badge-bg)] p-4 rounded-2xl border border-[var(--card-border)]">
            <div className="text-[10px] opacity-60 font-bold uppercase">FinOps Cost Optimization</div>
            <div className="text-2xl font-black text-[var(--text-primary)] mt-1">
              -{telemetry.savingsRatePct}%
            </div>
            <div className="text-[10px] opacity-75 mt-1 font-bold">
              ${(telemetry.monthlySavingsUSD / 1000000).toFixed(2)}M / mo saved
            </div>
          </div>
        </div>

        {/* System Logs Feed */}
        <div className="bg-[var(--card-bg)] p-4 rounded-2xl border border-[var(--card-border)] text-[11px] space-y-1.5 mb-6">
          <div className="text-[10px] opacity-50 uppercase font-bold mb-1">REALTIME_LOG_STREAM</div>
          <div className="text-[var(--text-primary)] font-semibold">[00:31:42] Azure K8s cluster warm pool rebalanced (+120 spot nodes)</div>
          <div className="opacity-70">[00:31:45] SGX-v2 isolation keys rotated for sector CYBER_CORE_MESH</div>
          <div className="font-bold">[00:31:48] Telemetry packet throughput verified @ 4,812,090 p/s</div>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[var(--btn-main-bg)] text-[var(--btn-main-text)] text-xs font-mono-tech rounded-full hover:opacity-90 font-extrabold cursor-pointer shadow-md"
          >
            DISMISS_MONITOR
          </button>
        </div>

      </div>
    </div>
  );
};
