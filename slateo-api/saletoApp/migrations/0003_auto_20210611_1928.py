# Generated by Django 3.1.3 on 2021-06-11 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('saletoApp', '0002_auto_20210604_1434'),
    ]

    operations = [
        migrations.AddField(
            model_name='papermanagement',
            name='paperRemark',
            field=models.TextField(blank=True, default='Done', null=True, verbose_name='Question Detail'),
        ),
        migrations.AlterField(
            model_name='papermanagement',
            name='noOfSets',
            field=models.CharField(blank=True, max_length=4, null=True, verbose_name='Paper Remark'),
        ),
    ]