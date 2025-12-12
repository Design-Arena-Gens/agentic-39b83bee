'use client';

import { useState } from 'react';
import { Download, PlayCircle, Calendar, Hash, Video, Clock, CheckCircle, Copy, ExternalLink } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'workflow' | 'instructions'>('workflow');
  const [copied, setCopied] = useState(false);

  const pabblyWorkflowJSON = {
    "workflow_name": "YouTube to TikTok Automation",
    "trigger": {
      "type": "Schedule",
      "schedule": "Every 24 hours",
      "action": "Start Workflow"
    },
    "steps": [
      {
        "step": 1,
        "name": "YouTube Search",
        "app": "YouTube Data API v3",
        "action": "Search Videos",
        "config": {
          "query": "imagine OR imagines",
          "publishedAfter": "{{now - 48 hours}}",
          "order": "date",
          "maxResults": 10,
          "type": "video"
        },
        "free_alternative": "Use YouTube RSS Feed + RSS by Zapier (Free)"
      },
      {
        "step": 2,
        "name": "Filter by Engagement",
        "app": "Filter",
        "action": "Sort and Filter",
        "config": {
          "sort_by": "viewCount + commentCount",
          "limit": 3
        }
      },
      {
        "step": 3,
        "name": "Loop Through Videos",
        "app": "Iterator",
        "action": "Loop",
        "config": {
          "array": "{{step1.videos}}"
        }
      },
      {
        "step": 4,
        "name": "Get Video Details",
        "app": "YouTube Data API v3",
        "action": "Get Video Info",
        "config": {
          "videoId": "{{step3.current.id}}"
        }
      },
      {
        "step": 5,
        "name": "Download Video",
        "app": "HTTP/Webhook",
        "action": "POST Request",
        "config": {
          "url": "https://api.cobalt.tools/api/json",
          "method": "POST",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          "body": {
            "url": "https://youtube.com/watch?v={{step4.id}}",
            "videoQuality": "max"
          }
        },
        "free_tool": "cobalt.tools API (Free, no auth required)"
      },
      {
        "step": 6,
        "name": "Generate Caption & Hashtags",
        "app": "OpenAI GPT",
        "action": "Create Completion",
        "config": {
          "prompt": "Create an engaging TikTok caption and 10 hashtags for this video title: {{step4.title}}. Theme: Wattpad imagines. Format: Caption on first line, then hashtags.",
          "model": "gpt-3.5-turbo"
        },
        "free_alternative": "Use Hugging Face API (Free tier) or GPT4Free"
      },
      {
        "step": 7,
        "name": "Calculate Best Posting Time",
        "app": "Date/Time Formatter",
        "action": "Calculate Time",
        "config": {
          "timezone": "America/New_York",
          "best_times": ["9:00 AM", "12:00 PM", "5:00 PM", "7:00 PM"],
          "offset_days": "{{step3.index}}"
        }
      },
      {
        "step": 8,
        "name": "Schedule TikTok Post",
        "app": "Delay",
        "action": "Delay Until",
        "config": {
          "delay_until": "{{step7.calculated_time}}"
        }
      },
      {
        "step": 9,
        "name": "Post to TikTok",
        "app": "HTTP/Webhook",
        "action": "POST Request",
        "config": {
          "url": "TikTok API endpoint",
          "method": "POST",
          "note": "TikTok doesn't have official posting API - use Buffer or Publer free tier"
        },
        "free_alternative": "Buffer (Free: 3 posts), Publer (Free: unlimited), or manual upload"
      },
      {
        "step": 10,
        "name": "Send Notification",
        "app": "Email",
        "action": "Send Email",
        "config": {
          "to": "your@email.com",
          "subject": "TikTok Video Scheduled",
          "body": "Video: {{step4.title}}\nCaption: {{step6.caption}}\nScheduled: {{step7.calculated_time}}\nDownload: {{step5.download_url}}"
        }
      }
    ]
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(pabblyWorkflowJSON, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            🎬 YouTube → TikTok Automation
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Automated Pabbly Workflow using 100% Free Tools
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            No Paid APIs Required
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg p-1 shadow-sm max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('workflow')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              activeTab === 'workflow'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Workflow
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              activeTab === 'instructions'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Instructions
          </button>
        </div>

        {/* Workflow Tab */}
        {activeTab === 'workflow' && (
          <div className="space-y-6">
            {/* Visual Workflow */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <PlayCircle className="w-6 h-6 text-purple-600" />
                Workflow Steps
              </h2>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border-l-4 border-red-500">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">YouTube Search</h3>
                    <p className="text-sm text-gray-600 mb-2">Search for "imagine OR imagines" videos from last 48 hours</p>
                    <div className="text-xs bg-white px-3 py-1 rounded inline-block font-mono">
                      YouTube Data API v3 / RSS Feed (Free)
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border-l-4 border-orange-500">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Filter & Sort by Engagement</h3>
                    <p className="text-sm text-gray-600 mb-2">Sort by views + comments, select top 3</p>
                    <div className="text-xs bg-white px-3 py-1 rounded inline-block font-mono">
                      Pabbly Filter (Built-in)
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-500">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Videos (MP4)
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Download unmodified MP4 files using free API</p>
                    <div className="text-xs bg-white px-3 py-1 rounded inline-block font-mono">
                      cobalt.tools API (Free, no auth)
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Generate Caption & Hashtags
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">AI-generated engaging caption + 10 Wattpad-themed hashtags</p>
                    <div className="text-xs bg-white px-3 py-1 rounded inline-block font-mono">
                      Hugging Face API / GPT4Free (Free)
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Schedule Posts
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Best USA times: 9 AM, 12 PM, 5 PM, 7 PM EST</p>
                    <div className="text-xs bg-white px-3 py-1 rounded inline-block font-mono">
                      Publer / Buffer (Free tier)
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border-l-4 border-indigo-500">
                  <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">6</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Return Results
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Email with video links, captions, and scheduled times</p>
                    <div className="text-xs bg-white px-3 py-1 rounded inline-block font-mono">
                      Pabbly Email (Built-in)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* JSON Export */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Workflow JSON</h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy JSON'}
                </button>
              </div>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(pabblyWorkflowJSON, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Instructions Tab */}
        {activeTab === 'instructions' && (
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Setup Instructions</h2>

            <div className="space-y-6">
              {/* Prerequisites */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Prerequisites</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Pabbly Connect account (Free plan: 100 tasks/month)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>YouTube Data API key (Free from Google Cloud Console)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Hugging Face API key (Free, unlimited)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Publer account (Free: unlimited scheduling)</span>
                  </li>
                </ul>
              </div>

              {/* Setup Steps */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Setup Steps</h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <h4 className="font-bold">Get YouTube API Key</h4>
                    </div>
                    <ol className="ml-8 space-y-1 text-sm text-gray-700 list-decimal">
                      <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline inline-flex items-center gap-1">console.cloud.google.com <ExternalLink className="w-3 h-3" /></a></li>
                      <li>Create new project → Enable YouTube Data API v3</li>
                      <li>Credentials → Create API Key</li>
                      <li>Copy the API key</li>
                    </ol>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <h4 className="font-bold">Get Hugging Face API Key</h4>
                    </div>
                    <ol className="ml-8 space-y-1 text-sm text-gray-700 list-decimal">
                      <li>Go to <a href="https://huggingface.co" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline inline-flex items-center gap-1">huggingface.co <ExternalLink className="w-3 h-3" /></a></li>
                      <li>Sign up for free account</li>
                      <li>Settings → Access Tokens → New Token</li>
                      <li>Copy the token</li>
                    </ol>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <h4 className="font-bold">Setup Publer</h4>
                    </div>
                    <ol className="ml-8 space-y-1 text-sm text-gray-700 list-decimal">
                      <li>Go to <a href="https://publer.io" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline inline-flex items-center gap-1">publer.io <ExternalLink className="w-3 h-3" /></a></li>
                      <li>Sign up for free account</li>
                      <li>Connect your TikTok account</li>
                      <li>Get API credentials from Settings → Integrations</li>
                    </ol>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <h4 className="font-bold">Create Pabbly Workflow</h4>
                    </div>
                    <ol className="ml-8 space-y-1 text-sm text-gray-700 list-decimal">
                      <li>Login to <a href="https://www.pabbly.com/connect" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline inline-flex items-center gap-1">Pabbly Connect <ExternalLink className="w-3 h-3" /></a></li>
                      <li>Create New Workflow</li>
                      <li>Add trigger: Schedule (Every 24 hours)</li>
                      <li>Follow the workflow steps from the JSON above</li>
                    </ol>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                      <h4 className="font-bold">Configure Each Step</h4>
                    </div>
                    <div className="ml-8 space-y-3 text-sm text-gray-700">
                      <div>
                        <strong>YouTube Search:</strong>
                        <ul className="ml-4 mt-1 list-disc">
                          <li>App: YouTube Data API v3</li>
                          <li>Action: Search List</li>
                          <li>Query: imagine OR imagines</li>
                          <li>Published After: {"{{now - 48h}}"}</li>
                          <li>Order: date</li>
                          <li>Max Results: 10</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Download Video:</strong>
                        <ul className="ml-4 mt-1 list-disc">
                          <li>App: HTTP/Webhooks</li>
                          <li>Method: POST</li>
                          <li>URL: https://api.cobalt.tools/api/json</li>
                          <li>Body: {"{ \"url\": \"{{youtube_url}}\", \"videoQuality\": \"max\" }"}</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Generate Caption:</strong>
                        <ul className="ml-4 mt-1 list-disc">
                          <li>App: HTTP/Webhooks</li>
                          <li>Method: POST</li>
                          <li>URL: https://api-inference.huggingface.co/models/gpt2</li>
                          <li>Headers: Authorization: Bearer YOUR_HF_TOKEN</li>
                          <li>Prompt: Create TikTok caption for: {"{{video_title}}"}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Free Tools Reference */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Free Tools Used</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded">
                    <strong className="text-green-900">cobalt.tools</strong>
                    <p className="text-sm text-gray-600">Free YouTube downloader API</p>
                    <a href="https://cobalt.tools" target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:underline inline-flex items-center gap-1">
                      cobalt.tools <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <strong className="text-green-900">Hugging Face</strong>
                    <p className="text-sm text-gray-600">Free AI text generation</p>
                    <a href="https://huggingface.co" target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:underline inline-flex items-center gap-1">
                      huggingface.co <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <strong className="text-green-900">Publer</strong>
                    <p className="text-sm text-gray-600">Free TikTok scheduling</p>
                    <a href="https://publer.io" target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:underline inline-flex items-center gap-1">
                      publer.io <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <strong className="text-green-900">YouTube Data API</strong>
                    <p className="text-sm text-gray-600">Free video search & metadata</p>
                    <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:underline inline-flex items-center gap-1">
                      Google Cloud <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Best Posting Times */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Best TikTok Posting Times (USA)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-white p-3 rounded text-center">
                    <div className="font-bold text-purple-600">9:00 AM EST</div>
                    <div className="text-xs text-gray-600">Morning commute</div>
                  </div>
                  <div className="bg-white p-3 rounded text-center">
                    <div className="font-bold text-purple-600">12:00 PM EST</div>
                    <div className="text-xs text-gray-600">Lunch break</div>
                  </div>
                  <div className="bg-white p-3 rounded text-center">
                    <div className="font-bold text-purple-600">5:00 PM EST</div>
                    <div className="text-xs text-gray-600">After work</div>
                  </div>
                  <div className="bg-white p-3 rounded text-center">
                    <div className="font-bold text-purple-600">7:00 PM EST</div>
                    <div className="text-xs text-gray-600">Prime time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>🎉 All tools used in this workflow are 100% free</p>
          <p className="mt-2">Built with Next.js • Deployed on Vercel</p>
        </div>
      </div>
    </main>
  );
}
