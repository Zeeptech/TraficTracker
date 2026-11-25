package expo.modules.widget

import android.content.Context
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class WidgetModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("Widget")

    Function("update") { data: String ->
      val context = appContext.reactContext ?: return@Function

      context
        .getSharedPreferences(TraficWidgetProvider.PREFERENCES, Context.MODE_PRIVATE)
        .edit()
        .putString("data", data)
        .apply()

      TraficWidgetProvider.updateAll(context)
    }
  }
}
