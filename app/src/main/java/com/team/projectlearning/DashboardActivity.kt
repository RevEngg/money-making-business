package com.team.projectlearning

import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import com.team.projectlearning.databinding.ActivityDashboardBinding

class DashboardActivity : AppCompatActivity(), View.OnClickListener {
    private lateinit var binding: ActivityDashboardBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDashboardBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setSupportActionBar(binding.toolbar)
        binding.mactCard.setOnClickListener(this)
        binding.ctisCard.setOnClickListener(this)
        binding.daCard.setOnClickListener(this)
        binding.ismaCard.setOnClickListener(this)
    }

    private fun startClassHome(value: String) {
        startActivity(
            Intent(this, ClassHomeActivity::class.java).putExtra(
                "EXTRA_CLASS_VALUE",
                value
            )
        )
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.toolbar_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.action_sign_out -> {
                MaterialAlertDialogBuilder(this)
                    .setTitle(resources.getString(R.string.are_you_sure_question))
                    .setNegativeButton(resources.getString(R.string.cancel)) { _, _ -> }
                    .setPositiveButton(resources.getString(R.string.sign_out)) { _, _ ->
                        Firebase.auth.signOut()
                        startActivity(
                            Intent(
                                this,
                                LoginActivity::class.java
                            ).apply { addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK) })
                    }.show()
            }
        }
        return super.onOptionsItemSelected(item)
    }

    override fun onClick(v: View) {
        when (v.id) {
            R.id.mact_card -> {
                startClassHome("mact")
            }
            R.id.ctis_card -> {
                startClassHome("ctis")
            }
            R.id.da_card -> {
                startClassHome("da")
            }
            R.id.isma_card -> {
                startClassHome("isma")
            }
        }
    }
}