from django.conf import settings  # Import Django settings module

from storages.backends.gcloud import GoogleCloudStorage
from urllib.parse import urljoin


class GoogleCloudMediaFileStorage(GoogleCloudStorage):
    bucket_name = settings.GS_BUCKET_NAME

    def url(self, name):
        return urljoin(settings.MEDIA_URL, name)
