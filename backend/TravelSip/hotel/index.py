from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register

from .models import Hotel


@register(Hotel)
class SearchHotelIndex(AlgoliaIndex):
    fields = (
        "title",
        "description",
        "city",
        "imageUrl",
        "address",
    )
    settings = {"searchableAttributes": ["title"]}
    index_name = "hotel_index"
