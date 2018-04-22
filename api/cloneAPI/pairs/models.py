from django.db import models

# Create your models here.

class Pair(models.Model):
    this_text = models.TextField()
    that_text = models.TextField()

    def __str__(self):
        return self.this_text + ' + ' + self.that_text

    class Meta:
        ordering = ('this_text',)