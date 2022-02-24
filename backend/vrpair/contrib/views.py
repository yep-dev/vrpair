from rest_framework import generics, status
from rest_framework.response import Response


class UpdateOrCreateAPIView(generics.CreateAPIView):
    serializer_response = None

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context=self.get_serializer_context()
        )
        serializer.is_valid(raise_exception=True)

        instance, _ = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        serializer_response = self.serializer_response or self.serializer_class(
            instance=instance, context=self.get_serializer_context()
        )
        return Response(
            serializer_response.data, status=status.HTTP_201_CREATED, headers=headers
        )


class SerializeGetMixin:
    serializer_get = None

    def get_params(self):
        serializer = self.serializer_get(
            data=self.request.query_params, context=self.get_serializer_context()
        )
        serializer.is_valid(raise_exception=True)
        return serializer.data
