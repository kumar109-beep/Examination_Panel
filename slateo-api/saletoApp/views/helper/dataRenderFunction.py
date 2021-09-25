import pandas as pd
import collections
from ...models.rolesMangementModel import *
from ...models.courseManagementModel import *
from ...models.studentManagementModel import *
from ...models.papermanagementModel import *
from ...models.examManagementModel import *
from ...models.batchmanagementModel import *



def examMangementRenderData(snippets,dataL):
    listData = []
    dicData = {}
    exam = isinstance(snippets, collections.Iterable)
    if exam:
        if len(snippets) != 0:
            for i in snippets:
                dicData['id'] = i.id
                dicData['examName'] = i.examName
                dicData['examID'] = i.examID
                dicData['examAssociateCourse'] = i.examAssociateCourse.courseName
                dicData['examStartDate'] = i.examStartDate
                dicData['examEndDate'] = i.examEndDate
                dicData['examTotalPaper'] = Eaxm_Paper.objects.filter(exam_management_fk__examID=i.examID).count()
                dicData['examTotalStudent'] = StudentManagement.objects.filter(courseFK__id=i.examAssociateCourse.id).count()
                listData.append(dicData)
                dicData = {}
            return listData
        else:
            return listData
    else:
        paperListData = []
        paperDictData = {}
        # print(snippets.batchManagement_mtwom)
        dicData['id'] = snippets.id
        dicData['examName'] = snippets.examName
        dicData['examID'] = snippets.examID
        dicData['examAssociateCourseType'] = snippets.examAssociateCourseType.courseTypeName
        dicData['examAssociateCourseTypeID'] = snippets.examAssociateCourseType.id
        dicData['examAssociateCourse'] = snippets.examAssociateCourse.courseName
        dicData['examAssociateCourseID'] = snippets.examAssociateCourse.id
        dicData['examType'] = snippets.examType
        dicData['examStartDate'] = snippets.examStartDate
        dicData['examEndDate'] = snippets.examEndDate
        dicData['examPassword'] = snippets.examPassword
        dat = Eaxm_Paper.objects.filter(exam_management_fk=snippets.id)
        if len(dat) != 0:
            for j in dat:
                paperDictData['id']  = j.id
                paperDictData['subjectName']  = j.examPapers.paperAssociateSubject.subjectName
                paperDictData['year']  = j.examPapers.created_at
                paperDictData['paperName']  = j.examPapers.paperName
                paperDictData['paperID']  = j.examPapers.id
                paperDictData['totalPaperTime']  = j.examPapers.totalPaperTime
                paperDictData['paperStartDate']  = j.paperStartDate
                paperDictData['paper_time_start']  = j.paper_time_start
                paperDictData['paper_procter_id']  = j.paper_procter.id
                paperDictData['paper_procter_name']  = j.paper_procter.fullName
                paperListData.append(paperDictData)
                paperDictData = {}
            dicData['examPaperDetail'] = paperListData
        else:
            dicData['examPaperDetail'] = []
        batchListData = []
        batchDictData = {}
        batches = BatchtManagement.objects.filter(id__in=dataL)
        if len(batches) != 0:
            for j in batches:
                batchDictData['id']  = j.id
                batchDictData['batchName']  = j.batchName
                batchListData.append(batchDictData)
                batchDictData = {}
            dicData['batchManagement_mtwom'] = batchListData
        else:
            dicData['batchManagement_mtwom'] = []
        print(batches)
        return dicData
        






def questionDataRender(ques,dificultyList,languageList,quesTypeList,byMarksList):
    df = pd.DataFrame(list(ques))
    listData = ConvertFilterinDict(ques)
    df = pd.DataFrame(listData)
    if len(eval(dificultyList)) == 0 and len(eval(languageList)) == 0 and len(eval(quesTypeList)) == 0 and len(eval(byMarksList)) == 0:
        listData = df.to_dict('records')
        return listData
    else:
        # if len(eval(dificultyList)) != 0 and len(eval(languageList)) != 0 and len(eval(quesTypeList)) != 0 and len(eval(byMarksList)) != 0:
        if len(df) != 0:
            dificultyListFlag = df.difficultyLevel.isin(eval(dificultyList))
            languageListFlag = df.selectLanguage.isin(eval(languageList))
            quesTypeListFlag = df.questionType.isin(eval(quesTypeList))
            flag = False
            for i in eval(byMarksList):
                if i == '>3':
                    flag = True
            if flag:
                addMoreMarksList = eval(byMarksList) + ['4','5','6','7','8','9','10','11','12','13','14','15']
                addMoreMarksList.remove('>3')
                byMarksListFlag = df.correctMarks.isin(addMoreMarksList)  
            else:
                byMarksListFlag = df.correctMarks.isin(eval(byMarksList))

            # Two Combination
            if(len(eval(dificultyList)) != 0 and len(eval(languageList)) != 0 and len(eval(quesTypeList)) == 0 and len(eval(byMarksList)) == 0):
                listd = df[dificultyListFlag & languageListFlag]
                listData = listd.to_dict('records')
                return listData 
            elif(len(eval(dificultyList)) != 0 and len(eval(languageList)) == 0 and len(eval(quesTypeList)) != 0 and len(eval(byMarksList)) == 0):
                listd = df[dificultyListFlag & quesTypeListFlag]
                listData = listd.to_dict('records')
                return listData 
            elif(len(eval(dificultyList)) != 0 and len(eval(languageList)) == 0 and len(eval(quesTypeList)) == 0 and len(eval(byMarksList)) != 0):
                listd = df[dificultyListFlag & byMarksListFlag]
                listData = listd.to_dict('records')
                return listData 
            elif(len(eval(dificultyList)) == 0 and len(eval(languageList)) != 0 and len(eval(quesTypeList)) != 0 and len(eval(byMarksList)) == 0):
                listd = df[languageListFlag & quesTypeListFlag]
                listData = listd.to_dict('records')
                return listData 
            elif(len(eval(dificultyList)) == 0 and len(eval(languageList)) != 0 and len(eval(quesTypeList)) == 0 and len(eval(byMarksList)) != 0):
                listd = df[languageListFlag & byMarksListFlag]
                listData = listd.to_dict('records')
                return listData 
            elif(len(eval(dificultyList)) == 0 and len(eval(languageList)) == 0 and len(eval(quesTypeList)) != 0 and len(eval(byMarksList)) != 0):
                listd = df[quesTypeListFlag & byMarksListFlag]
                listData = listd.to_dict('records')
                return listData 
                
            # Three Combination
            elif len(eval(dificultyList)) != 0 and len(eval(languageList)) != 0 and len(eval(quesTypeList)) != 0 and len(eval(byMarksList)) == 0:
                listd = df[dificultyListFlag  & languageListFlag & quesTypeListFlag]
                listData = listd.to_dict('records')
                return listData 
            elif len(eval(dificultyList)) != 0 and len(eval(languageList)) == 0 and len(eval(quesTypeList)) != 0 and len(eval(byMarksList)) != 0:
                print('Language Not Selected Only')
                listd = df[dificultyListFlag  & quesTypeListFlag & byMarksListFlag]
                listData = listd.to_dict('records')
                return listData 
            elif len(eval(dificultyList)) != 0 and len(eval(languageList)) != 0 and len(eval(quesTypeList)) == 0 and len(eval(byMarksList)) != 0:
                listd = df[dificultyListFlag  & languageListFlag & byMarksListFlag]
                listData = listd.to_dict('records')
                return listData 
            elif len(eval(dificultyList)) == 0 and len(eval(languageList)) != 0 and len(eval(quesTypeList)) != 0 and len(eval(byMarksList)) != 0:
                listd = df[quesTypeListFlag & languageListFlag & byMarksListFlag]
                listData = listd.to_dict('records')
                return listData 
            # Four Combination
            elif len(eval(dificultyList)) != 0 and len(eval(languageList)) != 0 and len(eval(quesTypeList)) != 0 and len(eval(byMarksList)) != 0:
                listd = df[dificultyListFlag & quesTypeListFlag & languageListFlag & byMarksListFlag]
                listData = listd.to_dict('records')
                return listData 

            else:
                listd = df[dificultyListFlag | languageListFlag | quesTypeListFlag | byMarksListFlag]
                listData = listd.to_dict('records')
                return listData  
        else:
            return []

def ConvertFilterinDict(ques):
    listData = []
    dicData = {}
    # print(ques.data,type(ques.data))
    # exit()
    if len(ques) != 0:
        for i in ques:
            dicData['id'] = i.id
            dicData['course'] = i.refrence_Questions_Type_Detail.refrence_Question_Associated.selectCourse.courseName
            dicData['subject'] = i.refrence_Questions_Type_Detail.refrence_Question_Associated.selectSubject.subjectName
            dicData['topic'] = i.refrence_Questions_Type_Detail.refrence_Question_Associated.Topic
            dicData['questionType'] = i.refrence_Questions_Type_Detail.questionType
            dicData['subQuestionType'] = i.refrence_Questions_Type_Detail.subQuestionType 
            dicData['selectLanguage'] = i.refrence_Questions_Type_Detail.selectLanguage
            dicData['selectNoOption'] = i.refrence_Questions_Type_Detail.selectNoOption 
            dicData['optionList'] = i.optionList
            dicData['difficultyLevel'] = i.refrence_Questions_Type_Detail.difficultyLevel
            dicData['correctMarks'] = i.refrence_Questions_Type_Detail.correctMarks 
            dicData['question'] = i.question
            dicData['referQuestion'] = i.sameQuestionrefrence
            dicData['created_at'] = i.created_at
            listData.append(dicData)
            dicData = {}
        return listData
    else:
        return listData

    



def paperDataRender(ques):
    listData = []
    dicData = {}
    for i in ques:
        dicData['id'] = i.id
        dicData['course'] = i.refrenceTopaper.selectCourse.courseName
        dicData['subject'] = i.refrence_Questions_Type_Detail.refrence_Question_Associated.selectSubject.subjectName
        dicData['topic'] = i.refrence_Questions_Type_Detail.refrence_Question_Associated.Topic
        dicData['questionType'] = i.questionType
        dicData['subQuestionType'] = i.subQuestionType 
        dicData['selectLanguage'] = i.selectLanguage
        dicData['selectNoOption'] = i.selectNoOption 
        dicData['optionList'] = i.optionList
        dicData['difficultyLevel'] = i.difficultyLevel
        dicData['correctMarks'] = i.correctMarks 
        dicData['question'] = i.question
        dicData['created_at'] = i.created_at
        listData.append(dicData)
        dicData = {}
    return listData


def getPaperStudentWise(snippets):
    dataList = []
    dataDictionary = {}
    for i in snippets:
        dataDictionary["id"] = i.id
        dataDictionary["paperName"] = i.examPapers.paperName
        dataDictionary["paperAssociateSubject"] = i.examPapers.paperAssociateSubject.subjectName
        dataDictionary["paperStartDate"] = i.paperStartDate
        dataDictionary["paper_time_start"] = i.paper_time_start          
        dataDictionary["paper_total_time"] = i.examPapers.totalPaperTime
        dataDictionary["paperTotalMarks"] = i.examPapers.paperTotalMarks
        dataList.append(dataDictionary)
        dataDictionary = {}
    return dataList



def StudentRenderData(snippets):
    dataList = []
    dataDictionary = {}
    student = isinstance(snippets, collections.Iterable)
    if student:
        for i in snippets:
            dataDictionary["id"] = i.id
            dataDictionary["registrationNumber"] = i.referUser.username
            dataDictionary["emailID"] = i.referUser.email
            dataDictionary["fullName"] = i.fullName          
            dataDictionary["mobileNumber"] = i.mobileNumber       
            dataDictionary["guardianName"] = i.guardianName    
            dataDictionary["courseFK"] = i.courseFK.courseName   
            if i.images:
                dataDictionary["images"] = str(i.images)
            if i.signature:
                dataDictionary["signature"] = str(i.signature)
            dataList.append(dataDictionary)
            dataDictionary = {}
    else:
        dataDictionary["id"] = snippets.id
        dataDictionary["registrationNumber"] = snippets.referUser.username
        dataDictionary["emailID"] = snippets.referUser.email
        dataDictionary["fullName"] = snippets.fullName          
        dataDictionary["mobileNumber"] = snippets.mobileNumber   
        dataDictionary["dateOfBirth"] = snippets.dateOfBirth         
        dataDictionary["gender"] = snippets.gender        
        dataDictionary["guardianName"] = snippets.guardianName    
        dataDictionary["relationwithGuardian"] = snippets.relationwithGuardian   
        dataDictionary["guardianEmail"] = snippets.guardianEmail    
        dataDictionary["guardianMobile"] = snippets.guardianMobile
        dataDictionary["courseTypeFK"] = snippets.courseTypeFK.courseTypeName
        dataDictionary["courseFK"] = snippets.courseFK.courseName 
        dataDictionary["courseTypeFKID"] = snippets.courseTypeFK.id
        dataDictionary["courseFKID"] = snippets.courseFK.id 
        dataDictionary["handy"] = snippets.handy
        dataDictionary["temp_country"] = snippets.temp_country 
        dataDictionary["temp_state"] = snippets.temp_state           
        dataDictionary["temp_district"] = snippets.temp_district   
        dataDictionary["temp_address"] = snippets.temp_address        
        dataDictionary["temp_pincode"] = snippets.temp_pincode        
        dataDictionary["perm_country"] = snippets.perm_country      
        dataDictionary["perm_state"] = snippets.perm_state           
        dataDictionary["perm_district"] = snippets.perm_district        
        dataDictionary["perm_address"] = snippets.perm_address     
        dataDictionary["perm_pincode"] = snippets.perm_pincode
        dataDictionary["disability"] = snippets.disability
        
        if snippets.images:
            dataDictionary["images"] = str(snippets.images)
        if snippets.signature:
            dataDictionary["signature"] = str(snippets.signature)
        dataList.append(dataDictionary)

    return dataList



def AdminProfileUser(snippets):
    dataList = []
    dataDictionary = {}
    dataDictionary["id"] = snippets.id
    dataDictionary["adminID"] = snippets.refrence_user.id
    dataDictionary["username"] = snippets.refrence_user.username
    dataDictionary["email"] = snippets.refrence_user.email
    dataDictionary["name"] = snippets.name          
    dataDictionary["mobile_number"] = snippets.mobile_number   
    dataDictionary["birth_date"] = snippets.birth_date       
    dataDictionary["country"] = snippets.country.country_name
    dataDictionary["country_id"] = snippets.country.id    
    dataDictionary["state"] = snippets.state.country_state 
    dataDictionary["state_id"] = snippets.state.id  
    dataDictionary["city"] = snippets.city    
    dataDictionary["pincode"] = snippets.pincode
    dataDictionary["address"] = snippets.address
    dataDictionary["gender"] = snippets.gender   
    if snippets.images:
        dataDictionary["images"] = str(snippets.images)
    if snippets.signature:
        dataDictionary["signature"] = str(snippets.signature)
    dataList.append(dataDictionary)
    return dataList

def ResourceDataRender(snippetsData):
    dataList = []
    dataDictionary = {}
    resource = isinstance(snippetsData, collections.Iterable)
    
    if resource:
        
        for snippets in snippetsData:
            # dataDictionary["role_designation"] = RolesManagement.objects.filter(id__in=[int(i) for i in eval(snippets.role_designation)]).values_list('roleName', flat=True)
            dataDictionary["role_designation"] = snippets.role_designation
            dataDictionary["id"] = snippets.id
            dataDictionary["employeeCode"] = snippets.referUser.username
            dataDictionary["fullName"] = snippets.fullName
            dataSubject = Subjects.objects.get(id=snippets.subject_speciality)
            dataDictionary["subject_speciality"] = dataSubject.subjectName
            dataDictionary["emailID"] = snippets.referUser.email
            dataDictionary["mobileNumber"] = snippets.mobileNumber
            dataList.append(dataDictionary)
            dataDictionary = {}
    else:
        # dataDictionary["role_designation"] = list(RolesManagement.objects.filter(id__in=eval(snippetsData.role_designation)).values_list('roleName', flat=True))
        dataDictionary["role_designation"] = snippetsData.role_designation
        dataDictionary["id"] = snippetsData.id
        dataDictionary["employeeCode"] = snippetsData.referUser.username
        dataDictionary["fullName"] = snippetsData.fullName
        dataDictionary["dateOfBirth"] = snippetsData.dateOfBirth
        dataDictionary["gender"] = snippetsData.gender
        dataDictionary["subject_speciality"] = snippetsData.subject_speciality
        dataDictionary["emailID"] = snippetsData.referUser.email
        dataDictionary["mobileNumber"] = snippetsData.mobileNumber
        dataDictionary["country"] = snippetsData.country
        dataDictionary["state"] = snippetsData.state
        dataDictionary["address"] = snippetsData.address
        dataDictionary["district"] = snippetsData.district
        dataDictionary["pincode"] = snippetsData.pincode
        dataDictionary["education"] = snippetsData.education
        dataDictionary["experience"] = snippetsData.experience
        if snippetsData.images:
            dataDictionary["images"] = str(snippetsData.images)
        if snippetsData.signature:
            dataDictionary["signature"] = str(snippetsData.signature)
        dataList.append(dataDictionary)
    return dataList

 
  