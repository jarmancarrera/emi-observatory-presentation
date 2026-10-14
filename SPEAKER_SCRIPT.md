# Speaker script

Approximate delivery: four minutes. Each slide is written for a short spoken explanation.

## Slide 1 · From annual report to living evidence

The annual edition is a useful atlas: it gives the research a point of view and a map of the evidence. The Observatory extends that work between editions. Researchers can compare trends, follow source updates, and return to the report for context. The concept is inspired by Cornell EMI and is independent of Cornell University.

## Slide 2 · An annual atlas. A living evidence base.

The annual edition frames the research. The project catalogues 164 source and methodology files, including company, mergers and acquisitions, and greenfield material. The Observatory will turn this library into searchable company profiles, an M&A deal explorer, and a greenfield project explorer. Researchers will filter by geography, sector, and year, then open each record with its details and source evidence.

## Slide 3 · Let researchers see the question

A researcher starts with an economy, a measure, and a time window. Visualization makes the shape of the comparison easier to inspect before writing an explanation. Units, gaps, and filters belong beside the trend. The drawing on screen is schematic, not an actual data result. The chart-ready snapshot contains six annual World Bank indicators.

## Slide 4 · How the evidence takes shape

Official World Bank responses enter a Python preparation step, where the data are normalized and checked. Each dated snapshot keeps its source, units, metadata, and identity together. Think of it as a dated photograph of the evidence. Plotly supports interactive charts, while FastAPI provides read-only data access for a separately managed setting. The public presentation layer remains static.

## Slide 5 · Annual baseline. Updates as sources change.

The current World Bank source-check design runs weekly, on Monday at 06:00 UTC. That check looks for revisions; it does not change the annual observation frequency. Changed snapshots remain addressable for pinned views. A source's own publication rhythm should set its refresh cadence, with event-driven updates where providers allow them. Python, FastAPI, Plotly, and GitHub Actions form the working stack. A production design can add Dagster and PostgreSQL to coordinate source-specific runs and history.

## Slide 6 · Ask the chatbot. Follow the evidence.

The Observatory will also include a chatbot. Researchers will be able to ask questions in plain language: How has foreign investment changed in this country? Which companies are expanding abroad? What M&A deals or greenfield projects match these filters? The chatbot will use the same evidence as the dashboard, cite its sources, and connect the answer to a chart or record. Think of it as a research assistant working beside the visual tools.

## Slide 7 · One research system. Two publishing rhythms.

The annual edition gives the work its editorial frame. The Observatory follows source updates at their own cadence and keeps each version available for repeatable comparisons. Researchers will explore countries, companies, M&A deals, and greenfield projects visually, or ask the chatbot for an explanation with sources. The two publishing rhythms make the research useful throughout the year while preserving the annual reference edition.
