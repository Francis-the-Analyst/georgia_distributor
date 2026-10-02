# Georgia Partner Intelligence

Static Cosentino market-intelligence dashboard for Georgia with two decision channels:

- **Distributor Intelligence:** 10 priority distributor, fabricator and hybrid targets selected for the first commercial wave. The complete candidate research remains in the parent project data.
- **Projects Intelligence:** 12 project actors and 26 named developments.

The positioning maps use the total research score on the vertical axis and a channel-specific readiness score on the horizontal axis. Potential is shown as green (high, `>=75`), orange (medium, `60-74`) or grey (low, `<60`). Typology is encoded by square, diamond or triangle.

Project developments are separately classified by lifecycle and commercial window. These classifications are research-based qualification signals, not guarantees that a procurement package remains open.

## Local use

```powershell
python -m http.server 4173
```

Open `http://127.0.0.1:4173/index_R_P.html`.

## Refresh and verify data

```powershell
node scripts/sync-source-data.mjs
node scripts/build-data.mjs
node scripts/validate-data.mjs
node --test tests/*.test.mjs
```

`source-data/` is the repository snapshot used to generate `data.js`. The canonical research files remain in the parent Georgia intelligence project.
