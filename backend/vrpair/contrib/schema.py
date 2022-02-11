from drf_spectacular.openapi import AutoSchema


class CustomSchema(AutoSchema):
    def get_operation_id(self):
        tokenized_path = self._tokenize_path()
        return "_".join([t.replace("-", "_") for t in tokenized_path[1:]])
