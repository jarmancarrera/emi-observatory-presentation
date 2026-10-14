# Speaker script

Approximate delivery: four minutes. Each slide is written for a short spoken explanation.

## Slide 1 · From annual report to living evidence

The annual edition is a useful atlas: it gives the research a point of view and a map of the evidence. The Observatory extends that work between editions. Researchers can compare trends, follow source updates, and return to the report for context. The concept is inspired by Cornell EMI and is independent of Cornell University.

## Slide 2 · An annual atlas. A living evidence base.

The research inventory describes 177 physical pages and 13 chapter analyses. The project catalogues 164 source and methodology files, including company, mergers and acquisitions, and greenfield material. The annual edition frames the questions. The source library lets researchers trace a series, its definition, and its date as they move from a report exhibit to a comparison.

## Slide 3 · Let researchers see the question

A researcher starts with an economy, a measure, and a time window. Visualization makes the shape of the comparison easier to inspect before writing an explanation. Units, gaps, and filters belong beside the trend. The drawing on screen is schematic, not an actual data result. The chart-ready snapshot contains six annual World Bank indicators.

## Slide 4 · How the evidence takes shape

Official World Bank responses enter a Python preparation step, where the data are normalized and checked. Each dated snapshot keeps its source, units, metadata, and identity together. Think of it as a dated photograph of the evidence. Plotly supports interactive charts, while FastAPI provides read-only data access for a separately managed setting. The public presentation layer remains static.

## Slide 5 · Annual baseline. Updates as sources change.

The current World Bank source-check design runs weekly, on Monday at 06:00 UTC. That check looks for revisions; it does not change the annual observation frequency. Changed snapshots remain addressable for pinned views. A source's own publication rhythm should set its refresh cadence, with event-driven updates where providers allow them. Python, FastAPI, Plotly, and GitHub Actions form the working stack. A production design can add Dagster and PostgreSQL to coordinate source-specific runs and history.

## Slide 6 · One snapshot. Two ways to explore.

A chart and a descriptive question use the same economy, measure, years, and snapshot. An answer travels with its source, unit, and observation period, so a reader can compare it with the visual view and then return to the annual edition. That connection between question, chart, and citation is what makes the interaction useful for research.

## Slide 7 · One research system. Two publishing rhythms.

The annual edition gives the work its editorial frame. The Observatory follows source updates at their own cadence and keeps each version available for repeatable comparisons. Explainable answers keep the source, unit, period, and snapshot beside the result. Together, the two rhythms carry Cornell's emerging-market research from an annual account into an evidence system researchers can revisit throughout the year.
