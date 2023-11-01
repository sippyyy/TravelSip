from algoliasearch_django import raw_search
from destination.models import Destination
from hotel.models import Hotel


def perform_search_destination(query, *args, **kwargs):
    response = raw_search(Destination, query)
    return response


def perform_search_hotel(query, *args, **kwargs):
    response = raw_search(Hotel, query)
    return response
