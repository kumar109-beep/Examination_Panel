# Generated by Django 3.1.3 on 2021-06-23 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('saletoApp', '0008_auto_20210622_1823'),
    ]

    operations = [
        migrations.AddField(
            model_name='eaxm_paper',
            name='batchManagement_mtwom',
            field=models.ManyToManyField(blank=True, to='saletoApp.BatchtManagement'),
        ),
    ]