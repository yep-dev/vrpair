from rest_framework import generics, status
from rest_framework.response import Response


class UpdateOrCreateAPIView(generics.CreateAPIView):
    response_serializer = None

    def get_serializer_class(self):
        return self.response_serializer or super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        instance, _ = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        response_serializer = self.get_serializer(instance=instance)
        return Response(
            response_serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class SerializeGetMixin:
    serializer_get = None

    def get_params(self):
        serializer = self.serializer_get(
            data=self.request.query_params, context=self.get_serializer_context()
        )
        serializer.is_valid(raise_exception=True)
        return serializer.data
