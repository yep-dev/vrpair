from factory import random
from factory.fuzzy import FuzzyChoice


class MultipleFuzzyChoice(FuzzyChoice):
    def fuzz(self):
        if self.choices is None:
            self.choices = list(self.choices_generator)
        length = random.randgen.randrange(1, len(self.choices) + 1)

        random.randgen.shuffle(self.choices)
        value = self.choices[:length]

        if self.getter is None:
            return value
        return self.getter(value)
