# Sales App

I created this application to see the ongoing sales in the supermarkets I usually go to.

The application get the saved sales from a firestore database. The database is populated by a service running on a Raspberry Pi. This service can be found here: [sales-server](https://github.com/csornyei/dutch-sales-server).

To start the app you need a Google Cloud certificate JSON and set `GCLOUD_CERT_FILE_PATH` environment variable to it's path.

## Todos:

- [x] routes for different supermarkets
- [ ] filtering by category
- [ ] shopping list and "Add to shopping list"
