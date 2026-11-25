package expo.modules.widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.os.SystemClock
import android.text.format.DateFormat
import android.view.View
import android.widget.RemoteViews
import org.json.JSONObject
import java.util.Date

class TraficWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray,
    ) {
        for (appWidgetId in appWidgetIds) {
            appWidgetManager.updateAppWidget(appWidgetId, render(context))
        }
    }

    companion object {
        const val PREFERENCES = "widget"

        fun updateAll(context: Context) {
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val appWidgetIds =
                appWidgetManager.getAppWidgetIds(ComponentName(context, TraficWidgetProvider::class.java))

            for (appWidgetId in appWidgetIds) {
                appWidgetManager.updateAppWidget(appWidgetId, render(context))
            }
        }

        private fun render(context: Context): RemoteViews {
            val views = RemoteViews(context.packageName, R.layout.widget)
            val data =
                context
                    .getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE)
                    .getString("data", null)
                    ?.let { JSONObject(it) }
            val name = data?.optString("name")?.takeIf { it.isNotEmpty() }
            val trip = data?.optJSONObject("trip")

            context.packageManager.getLaunchIntentForPackage(context.packageName)?.let { intent ->
                val pendingIntent =
                    PendingIntent.getActivity(
                        context,
                        0,
                        intent,
                        PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT,
                    )
                views.setOnClickPendingIntent(R.id.root, pendingIntent)
            }

            if (name == null) {
                views.setTextViewText(R.id.title, "Tap to log in")
                views.setViewVisibility(R.id.title, View.VISIBLE)
                views.setViewVisibility(R.id.trip, View.GONE)
                return views
            } else {
                views.setViewVisibility(R.id.title, View.GONE);
            }

            if (trip == null) {
                views.setViewVisibility(R.id.trip, View.GONE)
                return views
            }

            val departure = trip.getLong("departure")
            val details =
                listOfNotNull(
                    DateFormat.getTimeFormat(context).format(Date(departure)),
                    trip.optInt("frequencyMinutes", 0).takeIf { it > 0 }?.let { "every $it min" },
                )

            views.setTextViewText(R.id.line, trip.getString("line"))
            views.setTextViewText(R.id.route, "${trip.getString("from")} → ${trip.getString("to")}")
            views.setTextViewText(R.id.details, details.joinToString(" · "))
            views.setChronometer(
                R.id.countdown,
                SystemClock.elapsedRealtime() + (departure - System.currentTimeMillis()),
                null,
                true,
            )
            views.setChronometerCountDown(R.id.countdown, true)
            views.setViewVisibility(R.id.trip, View.VISIBLE)

            return views
        }
    }
}
