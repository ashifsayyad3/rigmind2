import { Suspense } from 'react'
import { FleetHealthBanner }    from '@/components/dashboard/FleetHealthBanner'
import { FleetMetricsGrid }     from '@/components/dashboard/FleetMetricsGrid'
import { RigStatusGrid }        from '@/components/dashboard/RigStatusGrid'
import { ActiveAlertsPanel }    from '@/components/dashboard/ActiveAlertsPanel'
import { RecentFailuresPanel }  from '@/components/dashboard/RecentFailuresPanel'
import { CertExpiryPanel }      from '@/components/dashboard/CertExpiryPanel'
import { AiInsightsPanel }      from '@/components/dashboard/AiInsightsPanel'
import { NptTrendChart }        from '@/components/charts/amcharts/NptTrendChart'
import { FailureSeverityChart } from '@/components/charts/amcharts/FailureSeverityChart'
import { FleetGlobeMap }        from '@/components/dashboard/FleetGlobeMap'
import { SkeletonCard }         from '@/components/common/SkeletonCard'

export default function CommandCenterPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title text-gradient-blue">Executive Command Center</h1>
          <p className="page-sub">Fleet intelligence · Predictive analytics · Real-time monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="select text-sm w-40">
            <option value="7">Last 7 days</option>
            <option value="30" defaultValue="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Fleet health score banner */}
      <Suspense fallback={<SkeletonCard h={88} />}>
        <FleetHealthBanner />
      </Suspense>

      {/* KPI metrics — 6 across */}
      <Suspense fallback={<SkeletonCard h={96} />}>
        <FleetMetricsGrid />
      </Suspense>

      {/* Main grid — charts + map */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          <Suspense fallback={<SkeletonCard h={280} />}>
            <NptTrendChart />
          </Suspense>
          <Suspense fallback={<SkeletonCard h={260} />}>
            <FailureSeverityChart />
          </Suspense>
        </div>
        <div className="space-y-5">
          <Suspense fallback={<SkeletonCard h={260} />}>
            <FleetGlobeMap />
          </Suspense>
          <Suspense fallback={<SkeletonCard h={280} />}>
            <AiInsightsPanel />
          </Suspense>
        </div>
      </div>

      {/* Rig cards */}
      <Suspense fallback={<SkeletonCard h={220} />}>
        <RigStatusGrid />
      </Suspense>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Suspense fallback={<SkeletonCard h={340} />}>
          <ActiveAlertsPanel />
        </Suspense>
        <Suspense fallback={<SkeletonCard h={340} />}>
          <RecentFailuresPanel />
        </Suspense>
        <Suspense fallback={<SkeletonCard h={340} />}>
          <CertExpiryPanel />
        </Suspense>
      </div>
    </div>
  )
}
