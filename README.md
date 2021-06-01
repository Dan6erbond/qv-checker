# QV Checker

[![Netlify Status](https://api.netlify.com/api/v1/badges/0b995ace-f64e-40e5-8f13-528ed6d9d39c/deploy-status)](https://app.netlify.com/sites/qv-checker/deploys)
![Vue Version](https://img.shields.io/badge/Vue-3.0-4FC08D?style=flat&logo=vue.js)
![TypeScript Version](https://img.shields.io/badge/TypeScript-4.1-3178C6?style=flat&logo=typescript)

Vue 3 PWA to poll the 2021 qualification results endpoint from [AG.ch](https://www.ag.ch/app/qvserviceapi/services/qv_info/swagger/docs/v1) to fetch the latest result status using composition API and Vuestic UI.

## Motivation

The AG.ch website provided by the canton Aargau does not poll the endpoint and provides poor UX for entering user data. To boot, it requires data that most people do not keep in their password manager or close to their person, and refreshing the results is a tedious process.

**QV Checker** abstracts this by polling the results on its own and updating them in realtime in the UI. This means no more reloading and the app can simply run in the background until results have been submitted.

## Functionality

This application fetches the payload from the endpoint used behind the scenes over a proxy endpoint deployed to Netlify functions. It also uses masks with [Cleave.js](https://nosir.github.io/cleave.js/) to ensure the inputs match the expected format and leverages the Vue 3 composition API to manage the compartmentalized features.

All the logical composition functions can be found in [`vue-cli/src/hooks`](./vue-cli/src/hooks) and the checker component is implemented as its own isolated SFC found in [`vue-cli/src/components/Checker.vue`](./vue-cli/src/components/Checker.vue). The Netlify function and configuration are at the root level as the Vite build still has some issues with Vuestic UI, which was used for this project.

© 2021, RaviAnand M.
