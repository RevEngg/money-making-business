package com.team.projectlearning.domain.data.network

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.team.projectlearning.models.FilesModel

class StudentsNotesRepository {
    fun getNotesData(): LiveData<MutableList<FilesModel>> {
        val mutableData = MutableLiveData<MutableList<FilesModel>>()
        Firebase.firestore.collection("groups").get().addOnSuccessListener { result ->
            val listData = mutableListOf<FilesModel>()
            for (document in result) {
                val fileName = document.get("fileName")
                val fileDetails = FilesModel(fileName as String)
                listData.add(fileDetails)
            }
            mutableData.value = listData
        }
        return mutableData
    }
}