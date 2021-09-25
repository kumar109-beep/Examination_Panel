from django.contrib import admin

# Register your models here.
from .models.studentManagementModel import *
from .models.batchmanagementModel import *
from .models.maintianLoginModel import *
from .models.groupbatchmanagementModel import *
from .models.clusterbatchmanagementModel import *
from .models.papermanagementModel import *
from .models.authorityManagementModel import *
from .models.reourceManagementModel import *
from .models.adminProfileManagementModel import *
from .models.courseManagementModel import *
from .models.questionBankManagementModel import *
from .models.examManagementModel import *
from .models.requestHeadingModel import *
from .models.languageMangementModel import * 
from .models.country_state_districtModel import *
from .models.resultManagementModel import *




@admin.register(AssignEvaluator)
class Saleto_AssignEvaluator(admin.ModelAdmin):
    list_display = ('id',)



@admin.register(QuestionBank_Filters)
class Saleto_QuestionBank_Filters(admin.ModelAdmin):
    list_display = ('Topic',)


@admin.register(QuestionBank_Question)
class Saleto_QuestionBank_Question(admin.ModelAdmin):
    list_display = ('id',)

@admin.register(LanguageManagement)
class Saleto_LanguageManagement(admin.ModelAdmin):
    list_display = ('languageName',)





#####################################################
#################### Course Management ##############
#####################################################

@admin.register(Type_of_Course)
class Saleto_Type_of_Course_Management(admin.ModelAdmin):
    list_display = ('courseTypeID','courseTypeName',)

@admin.register(Courses)
class Saleto_Course_Management(admin.ModelAdmin):
    list_display = ('courseID','courseName')


@admin.register(Subjects)
class Saleto_Subjects_Management(admin.ModelAdmin):
    list_display = ('subjectName',)

@admin.register(AssignSubjectToCourse)
class Saleto_AssignSubjectToCourse_Management(admin.ModelAdmin):
    list_display = ('type_of_courseFK','courseFK',)

# admin.site.register(AssignSubjectToCourse)

admin.site.register(AssignTopicToSubject)












#####################################################
####################   Admin Profile ################
#####################################################

@admin.register(Profile)
class Saleto_User_Profile_Management(admin.ModelAdmin):
    list_display = ('refrence_user',)

    # def has_add_permission(self, request):
    #     return False

    # def has_delete_permission(self, request, obj=None):
    #     return False

@admin.register(RequestHeading)
class Saleto_RequestHeading(admin.ModelAdmin):
    list_display = ('id',)




#####################################################
############  Question bank ################
#####################################################





@admin.register(Questions_Type)
class Saleto_Questions_Type(admin.ModelAdmin):
    list_display = ('questio_type_name','id',)

@admin.register(Questions_Sub_Type)
class Saleto_Questions_Sub_Type(admin.ModelAdmin):
    list_display = ('questio_sub_type_name','id',)

@admin.register(Questions_Level_Type)
class Saleto_Questions_Level_Type(admin.ModelAdmin):
    list_display = ('questio_level_type_name','id',)







# ########################## Authority Management ##########################
############################################################################

# @admin.register(Functionality)
# class Saleto_Functionality(admin.ModelAdmin):
#     list_display = ('functionality_name',)


# @admin.register(RolesAlocateAuthority)
# class Saleto_RolesAlocateAuthority(admin.ModelAdmin):
#     list_display = ('role_name',)

# @admin.register(AlocateAuthority)
# class Saleto_AlocateAuthority(admin.ModelAdmin):
#     list_display = ('allocated_id',)





# @admin.register(SubAuthority)
# class Saleto_SubAuthority(admin.ModelAdmin):
#     list_display = ('sub_authority',)


# @admin.register(MainAuthority)
# class Saleto_main_authority(admin.ModelAdmin):
#     list_display = ('main_authority',)



    


















#####################################################
############ Resource Management ####################
#####################################################
@admin.register(ResourceManagement)
class Saleto_Resource_Management(admin.ModelAdmin):
    list_display = ('id',)






#####################################################
############   Role Assign Authority ################
#####################################################
@admin.register(RolesManagement)
class Saleto_Role_Management(admin.ModelAdmin):
    list_display = ('roleID',)







#####################################################
############  Student Management     ################
#####################################################
@admin.register(StudentManagement)
class Saleto_Student_Management(admin.ModelAdmin):
    list_display = ('id',)

# @admin.register(StudentRegistration)
# class Saleto_Student_Credential(admin.ModelAdmin):
#     list_display = ('studentPassword',)











#####################################################
############ Batch Management #######################
#####################################################
@admin.register(BatchtManagement)
class Saleto_Batch_Management(admin.ModelAdmin):
    list_display = ('batchName',)







#####################################################
############  LoggedInUser ##########################
#####################################################
@admin.register(LoggedInUser)
class Saleto_Registration_Management(admin.ModelAdmin):
    list_display = ('user',)






#####################################################
############  Group Batch Management ################
#####################################################
@admin.register(GroupBatchtManagement)
class Saleto_Group_Management(admin.ModelAdmin):
    list_display = ('groupName',)





#####################################################
############  Cluster Batch Management ##############
#####################################################
@admin.register(ClusterBatchtManagement)
class Saleto_ClusterBatch_Management(admin.ModelAdmin):
    list_display = ('clusterName',)





#####################################################
############ Paper Management #######################
#####################################################
@admin.register(PaperManagement)
class Saleto_PaperManagement(admin.ModelAdmin):
    list_display = ('paperName',)


@admin.register(ExamManagement)
class Saleto_PaperManagement(admin.ModelAdmin):
    list_display = ('id','examName',)


@admin.register(Eaxm_Paper)
class Saleto_Eaxm_Paper(admin.ModelAdmin):
    list_display = ('id',)






#####################################################
############ Authority Management ###################
#####################################################
@admin.register(AuthorityManagement)
class Saleto_AuthorityManagement(admin.ModelAdmin):
    list_display = ('authorityName',)





@admin.register(Country)
class Saleto_Country(admin.ModelAdmin):
    list_display = ('country_name',)


@admin.register(State)
class Saleto_Country(admin.ModelAdmin):
    list_display = ('country_state',)
