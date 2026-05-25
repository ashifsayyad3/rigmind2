'use client'

import { useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { failuresApi } from '@/lib/api/client'

let am4core: typeof import('@amcharts/amcharts4/core') | null = null
let am4charts: typeof import('@amcharts/amcharts4/charts') | null = null
let am4themes_dark: unknown = null
let am4themes_animated: unknown = null

const SEVERITY_COLORS: Record<string, string> = {
  critical: '#ff1744',
  high:     '#ff6d00',
  medium:   '#ffab40',
  low:      '#00e676',
  unknown:  '#546e7a',
}

export function FailureSeverityChart() {
  const chartRef  = useRef<HTMLDivElement>(null)
  const chartInst = useRef<unknown>(null)

  const { data: stats, isLoading } = useQuery({
    queryKey: ['failures', 'stats'],
    queryFn:  () => failuresApi.getStats(undefined, 30),
  })

  useEffect(() => {
    if (!chartRef.current || isLoading) return
    let disposed = false

    async function init() {
      if (!am4core) {
        [am4core, am4charts, { default: am4themes_dark }, { default: am4themes_animated }] = await Promise.all([
          import('@amcharts/amcharts4/core'),
          import('@amcharts/amcharts4/charts'),
          import('@amcharts/amcharts4/themes/amchartsdark'),
          import('@amcharts/amcharts4/themes/animated'),
        ])
      }
      if (disposed || !am4core || !am4charts || !chartRef.current) return

      am4core.useTheme(am4themes_dark as Parameters<typeof am4core.useTheme>[0])
      am4core.useTheme(am4themes_animated as Parameters<typeof am4core.useTheme>[0])

      const chart     = am4core.create(chartRef.current, am4charts.PieChart)
      chartInst.current = chart
      chart.background.fill    = am4core.color('transparent')
      chart.background.opacity = 0
      chart.innerRadius        = am4core.percent(60)
      chart.radius             = am4core.percent(85)

      // Data from API stats
      const bySeverity = stats?.bySeverity ?? {}
      chart.data = Object.entries(bySeverity).map(([severity, count]) => ({
        severity: severity.charAt(0).toUpperCase() + severity.slice(1),
        count,
        color: am4core!.color(SEVERITY_COLORS[severity] ?? '#546e7a'),
      }))

      const pieSeries            = chart.series.push(new am4charts.PieSeries())
      pieSeries.dataFields.value = 'count'
      pieSeries.dataFields.category = 'severity'
      pieSeries.slices.template.propertyFields.fill = 'color'
      pieSeries.slices.template.stroke = am4core.color('#070b12')
      pieSeries.slices.template.strokeWidth = 2
      pieSeries.labels.template.disabled = true
      pieSeries.ticks.template.disabled  = true

      // Tooltip
      pieSeries.slices.template.tooltipText = '{category}: [bold]{value}[/] failures'
      pieSeries.tooltip!.background.fill    = am4core.color('#0e1520')
      pieSeries.tooltip!.background.stroke  = am4core.color('#1a2438')
      pieSeries.tooltip!.label.fill         = am4core.color('#e8edf5')
      pieSeries.tooltip!.getFillFromObject  = false

      // Center label
      const label      = chart.seriesContainer.createChild(am4core.Label)
      label.text       = `[font-size:22px bold #ffffff]${stats?.total ?? 0}[/]\n[font-size:10px #687a96]FAILURES[/]`
      label.horizontalCenter = 'middle'
      label.verticalCenter   = 'middle'
      label.textAlign        = 'middle'

      // Legend
      chart.legend              = new am4charts.Legend()
      chart.legend.position     = 'right'
      chart.legend.valign       = 'middle'
      chart.legend.labels.template.fill      = am4core.color('#687a96')
      chart.legend.labels.template.fontSize  = 10
      chart.legend.valueLabels.template.fill = am4core.color('#e8edf5')
      chart.legend.valueLabels.template.fontSize = 11
      chart.legend.valueLabels.template.fontWeight = '700'

      // Export
      chart.exporting.menu = new am4core.ExportMenu()
      chart.exporting.menu.align = 'right'
      chart.exporting.menu.items = [{ label: '⋯', menu: [{ label: 'PNG', type: 'png' }, { label: 'CSV', type: 'csv' }] }]
    }

    init()

    return () => {
      disposed = true
      if (chartInst.current) {
        (chartInst.current as { dispose: () => void }).dispose()
        chartInst.current = null
      }
    }
  }, [stats, isLoading])

  return (
    <div className="chart-container p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="section-label mb-0">Failures by Severity — Last 30 Days</div>
        {stats && <div className="text-[11px] text-surface-500 mono">NPT: <span className="text-amber-400">{(stats.totalNptHours ?? 0).toFixed(1)}h</span></div>}
      </div>
      {isLoading
        ? <div className="h-60 bg-surface-800/30 rounded-lg animate-pulse" />
        : <div ref={chartRef} style={{ width: '100%', height: 240 }} />
      }
    </div>
  )
}
