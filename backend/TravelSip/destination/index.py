from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register

from .models import Destination


@register(Destination)
class SearchDestinationIndex(AlgoliaIndex):
    fields = (
        "title",
        "description",
        "city",
        "imageUrl",
        "address",
    )
    settings = {"searchableAttributes": ["title"]}
    index_name = "destination_index"
