from rest_framework import generics
from rest_framework.response import Response
from .. import client
from destination.models import Destination
from TravelSip.gcloud import GoogleCloudMediaFileStorage


class Search(generics.GenericAPIView):
    queryset = Destination.objects.all()

    def get(self, request, *args, **kwargs):
        hotel_mode = request.query_params.get("hotel")
        destination_mode = request.query_params.get("destination")
        query = request.GET.get("q")
        results = ""
        media_storage = GoogleCloudMediaFileStorage()
        if hotel_mode:
            results = client.perform_search_hotel(query)
        elif destination_mode:
            print("des mode")
            results = client.perform_search_destination(query)

        for result in results.get("hits"):
            if "imageUrl" in result:
                result["imageUrl"] = media_storage.url(result["imageUrl"])
        return Response(results.get("hits"))


search_view = Search.as_view()
