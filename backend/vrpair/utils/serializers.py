from rest_framework import serializers


class MultipleChoiceField(serializers.MultipleChoiceField):
    def to_internal_value(self, data):
        return list(super().to_internal_value(data))

    def to_representation(self, value):
        return list(super().to_representation(value))


class FlattenMixin(object):
    """Flatens the specified related objects in this representation"""

    def to_representation(self, obj):
        assert hasattr(
            self.Meta, "flatten"
        ), 'Class {serializer_class} missing "Meta.flatten" attribute'.format(
            serializer_class=self.__class__.__name__
        )
        # Get the current object representation
        rep = super(FlattenMixin, self).to_representation(obj)
        # Iterate the specified related objects with their serializer
        for field, serializer_class in self.Meta.flatten:
            serializer = serializer_class(context=self.context)
            objrep = serializer.to_representation(getattr(obj, field))
            rep.update(objrep)
        return rep
