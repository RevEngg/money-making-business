package com.team.projectlearning.models

import com.google.firebase.firestore.PropertyName

data class FilesModel(
    @PropertyName("fileName")
    var fileName: String
)