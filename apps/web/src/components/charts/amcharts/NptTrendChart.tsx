'use client'

import { useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { nptApi } from '@/lib/api/client'

// amCharts 4 is loaded dynamically to avoid SSR issues
let am4core: typeof import('@amcharts/amcharts4/core') | null = null
let am4charts: typeof import('@amcharts/amcharts4/charts') | null = null
let am4themes_dark: unknown = null
let am4themes_animated: unknown = null

export function NptTrendChart() {
  const chartRef   = useRef<HTMLDivElement>(null)
  const chartInst  = useRef<unknown>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['npt', 'trend'],
    queryFn:  () => nptApi.getTrend(undefined, 12),
  })

  useEffect(() => {
    if (!chartRef.current || isLoading) return
    let disposed = false

    async function init() {
      // Lazy-load amCharts 4 (browser only)
      if (!am4core) {
        [am4core, am4charts, { default: am4themes_dark }, { default: am4themes_animated }] = await Promise.all([
          import('@amcharts/amcharts4/core'),
          import('@amcharts/amcharts4/charts'),
          import('@amcharts/amcharts4/themes/amchartsdark'),
          import('@amcharts/amcharts4/themes/animated'),
        ])
      }

      if (disposed || !am4core || !am4charts || !chartRef.current) return

      // Apply themes
      am4core.useTheme(am4themes_dark as Parameters<typeof am4core.useTheme>[0])
      am4core.useTheme(am4themes_animated as Parameters<typeof am4core.useTheme>[0])

      const chart = am4core.create(chartRef.current, am4charts.XYChart)
      chartInst.current = chart

      // Transparent background
      chart.background.fill = am4core.color('transparent')
      chart.background.opacity = 0

      // Padding
      chart.paddingTop    = 10
      chart.paddingRight  = 20
      chart.paddingBottom = 5
      chart.paddingLeft   = 5

      // Data — map from API or use mock
      chart.data = data?.map((d) => ({
        month: d.month,
        hours: d.hours,
        cost:  d.cost,
      })) ?? []

      // Category axis (X)
      const categoryAxis  = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'month'
      categoryAxis.renderer.grid.template.stroke      = am4core.color('#1a2438')
      categoryAxis.renderer.labels.template.fill      = am4core.color('#687a96')
      categoryAxis.renderer.labels.template.fontSize  = 10
      categoryAxis.renderer.minGridDistance = 30

      // Value axis (Y)
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.grid.template.stroke        = am4core.color('#1a2438')
      valueAxis.renderer.labels.template.fill        = am4core.color('#687a96')
      valueAxis.renderer.labels.template.fontSize    = 10
      valueAxis.title.text                           = 'NPT Hours'
      valueAxis.title.fill                           = am4core.color('#687a96')
      valueAxis.title.fontSize                       = 10

      // Line series — NPT hours
      const series    = chart.series.push(new am4charts.LineSeries())
      series.dataFields.valueY     = 'hours'
      series.dataFields.categoryX  = 'month'
      series.name                  = 'NPT Hours'
      series.stroke                = am4core.color('#0082ff')
      series.strokeWidth           = 2
      series.tensionX              = 0.8
      series.fillOpacity           = 0.08
      series.fill                  = am4core.color('#0082ff')

      // Tooltip
      series.tooltipText           = '{month}: [bold]{hours}h[/]\nCost: ~${cost}'
      if (series.tooltip) {
        series.tooltip.background.fill        = am4core.color('#0e1520')
        series.tooltip.background.stroke      = am4core.color('#0082ff')
        series.tooltip.label.fill             = am4core.color('#e8edf5')
        series.tooltip.getFillFromObject      = false
      }

      // Bullet
      const bullet   = series.bullets.push(new am4charts.CircleBullet())
      bullet.circle.stroke        = am4core.color('#0082ff')
      bullet.circle.strokeWidth   = 2
      bullet.circle.fill          = am4core.color('#070b12')
      bullet.circle.radius        = 4

      // Hover state
      const hs = bullet.states.create('hover')
      hs.properties.scale = 1.5

      // Cursor
      chart.cursor            = new am4charts.XYCursor()
      chart.cursor.lineX.stroke = am4core.color('#0082ff')
      chart.cursor.lineX.strokeOpacity = 0.4
      chart.cursor.lineY.disabled = true

      // Scrollbar
      chart.scrollbarX           = new am4core.Scrollbar()
      chart.scrollbarX.background.fill = am4core.color('#1a2438')
      chart.scrollbarX.thumb.background.fill = am4core.color('#0082ff')

      // Export
      chart.exporting.menu       = new am4core.ExportMenu()
      chart.exporting.menu.align = 'right'
      chart.exporting.menu.items = [{
        label: '⋯',
        menu: [
          { label: 'PNG',  type: 'png'  },
          { label: 'CSV',  type: 'csv'  },
          { label: 'XLSX', type: 'xlsx' },
          { label: 'PDF',  type: 'pdf'  },
        ],
      }]
    }

    init()

    return () => {
      disposed = true
      if (chartInst.current) {
        (chartInst.current as { dispose: () => void }).dispose()
        chartInst.current = null
      }
    }
  }, [data, isLoading])

  return (
    <div className="chart-container p-4">
      <div className="section-label">NPT Trend — Last 12 Months</div>
      {isLoading ? (
        <div className="h-64 bg-surface-800/30 rounded-lg animate-pulse" />
      ) : (
        <div ref={chartRef} style={{ width: '100%', height: 260 }} />
      )}
    </div>
  )
}
