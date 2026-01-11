import { BookOpen, Calculator, Home, ChevronRight, Award, Clock, TrendingUp, Lock, Sparkles, Wand2, Flame } from 'lucide-react';

interface DashboardProps {
  subject: 'english' | 'math' | null;
  onBackToHome: () => void;
  onLessonSelect: (lessonId: number, subject: 'english' | 'math') => void;
}

function Dashboard({ subject, onBackToHome, onLessonSelect }: DashboardProps) {
  const isEnglish = subject === 'english';

  const englishLessons = [
    { id: 1, title: 'How Writing Began', description: 'Discover the ancient origins of written language', level: 'Beginner', progress: 0, locked: false, runes: 50 },
    { id: 2, title: 'Basic Phonics', description: 'Understanding letter sounds and combinations', level: 'Beginner', progress: 0, locked: false, runes: 75 },
    { id: 3, title: 'Simple Words', description: 'Building your first vocabulary', level: 'Beginner', progress: 0, locked: false, runes: 100 },
    { id: 4, title: 'Basic Grammar', description: 'Nouns, verbs, and sentence structure', level: 'Beginner', progress: 0, locked: true, runes: 120 },
    { id: 5, title: 'Common Phrases', description: 'Everyday expressions and greetings', level: 'Intermediate', progress: 0, locked: true, runes: 150 },
    { id: 6, title: 'Reading Practice', description: 'Short stories and comprehension', level: 'Intermediate', progress: 0, locked: true, runes: 200 },
  ];

  const mathLessons = [
    { id: 1, title: 'The Magic of Counting', description: 'Discover how humans learned to count and use numbers', level: 'Beginner', progress: 0, locked: false, runes: 50 },
    { id: 2, title: 'Whimsical Navigation', description: 'Learning to add simple numbers', level: 'Beginner', progress: 0, locked: false, runes: 75 },
    { id: 3, title: 'Rational Point of View', description: 'Understanding other types of numbers', level: 'Beginner', progress: 0, locked: false, runes: 100 },
    { id: 4, title: 'Enchanted Multiplication', description: 'Coming Soon', level: 'Beginner', progress: 0, locked: true, runes: 120 },
    { id: 5, title: 'Three Sorcerers', description: 'Coming Soon', level: 'Intermediate', progress: 0, locked: true, runes: 150 },
    { id: 6, title: 'Taxes', description: 'Coming Soon', level: 'Intermediate', progress: 0, locked: true, runes: 200 },
  ];

  const lessons = isEnglish ? englishLessons : mathLessons;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <nav className="bg-gray-900/40 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button onClick={onBackToHome} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="bg-gradient-to-br from-purple-600 to-yellow-500 p-2 rounded-lg animate-pulse">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-yellow-300 bg-clip-text text-transparent">
                  Lit(eracy) up the Fire
                </span>
              </button>
              <div className="hidden md:flex items-center space-x-1">
                <button onClick={onBackToHome} className="flex items-center space-x-1 text-purple-200 hover:text-yellow-300 transition-colors">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <ChevronRight className="w-4 h-4 text-purple-400" />
                <span className="font-medium bg-gradient-to-r from-purple-400 to-yellow-300 bg-clip-text text-transparent">
                  {isEnglish ? 'Enchanted English' : 'Mathcraft Mastery'}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-yellow-500/20 border border-yellow-400/50 text-yellow-300 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">0 Runes</span>
              </div>
              <button className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors border border-purple-400/50">
                <span className="text-lg font-semibold text-white">✨</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`${isEnglish ? 'bg-purple-600/30' : 'bg-yellow-600/30'} backdrop-blur-sm p-3 rounded-xl border ${isEnglish ? 'border-purple-400/50' : 'border-yellow-400/50'}`}>
              {isEnglish ? (
                <BookOpen className={`w-8 h-8 ${isEnglish ? 'text-purple-300' : 'text-yellow-300'}`} />
              ) : (
                <Calculator className={`w-8 h-8 ${isEnglish ? 'text-purple-300' : 'text-yellow-300'}`} />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {isEnglish ? 'Enchanted English' : 'Mathcraft Mastery'}
              </h1>
              <p className="text-purple-300">Unlock ancient knowledge and ascend through mystical chapters</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30 hover:border-purple-400/60 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-300">Chapters Mastered</span>
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white">0 / {lessons.length}</div>
            <div className="mt-3 bg-gray-700/50 h-2 rounded-full overflow-hidden border border-purple-400/30">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-full" style={{ width: '0%' }}></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/30 hover:border-yellow-400/60 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-yellow-300">Time in Sorcery</span>
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white">0 hours</div>
            <p className="text-sm text-yellow-200 mt-2">Begin your mystical practice now</p>
          </div>

          <div className="bg-gradient-to-br from-pink-900/50 to-pink-800/30 backdrop-blur-sm p-6 rounded-xl border border-pink-500/30 hover:border-pink-400/60 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-pink-300">Magical Streak</span>
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-white">0 days</div>
            <p className="text-sm text-pink-200 mt-2">Ignite your learning fire</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span>Sacred Chapters of Knowledge</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                disabled={lesson.locked}
                onClick={() => !lesson.locked && subject && onLessonSelect(lesson.id, subject)}
                className={`relative group transition-all transform hover:scale-105 ${lesson.locked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl'}`}
              >
                <div className={`absolute inset-0 rounded-2xl ${isEnglish ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gradient-to-br from-yellow-500 to-yellow-600'} opacity-0 group-hover:opacity-20 transition-opacity blur-lg`}></div>

                <div className={`relative p-8 rounded-2xl backdrop-blur-sm border-2 transition-all ${
                  lesson.locked
                    ? 'bg-gray-800/20 border-gray-600/30'
                    : `${isEnglish ? 'bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/50 hover:border-purple-400/80' : 'bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border-yellow-500/50 hover:border-yellow-400/80'}`
                }`}>
                  {lesson.locked && (
                    <div className="absolute top-4 right-4 bg-gray-700 p-2 rounded-full">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  )}

                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    lesson.locked
                      ? 'bg-gray-700/50'
                      : isEnglish
                        ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50'
                        : 'bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/50'
                  }`}>
                    <span className={`text-2xl font-bold ${lesson.locked ? 'text-gray-500' : 'text-white'}`}>
                      {lesson.id}
                    </span>
                  </div>

                  <div className="text-left">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-lg font-bold ${lesson.locked ? 'text-gray-400' : 'text-white'}`}>
                        {lesson.title}
                      </h3>
                      {!lesson.locked && (
                        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2 ${
                          lesson.level === 'Beginner'
                            ? 'bg-green-500/30 text-green-300 border border-green-400/50'
                            : 'bg-orange-500/30 text-orange-300 border border-orange-400/50'
                        }`}>
                          {lesson.level}
                        </span>
                      )}
                    </div>

                    <p className={`text-sm mb-4 ${lesson.locked ? 'text-gray-500' : isEnglish ? 'text-purple-200' : 'text-yellow-200'}`}>
                      {lesson.description}
                    </p>

                    {!lesson.locked ? (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-gray-400">Rune Reward</span>
                          <div className="flex items-center space-x-1 text-yellow-400">
                            <Sparkles className="w-3 h-3" />
                            <span className="text-sm font-semibold">{lesson.runes}</span>
                          </div>
                        </div>
                        {lesson.progress > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-400">Progress</span>
                              <span className={isEnglish ? 'text-purple-300' : 'text-yellow-300'}>{lesson.progress}%</span>
                            </div>
                            <div className="bg-gray-700/50 h-1.5 rounded-full overflow-hidden border border-gray-600/50">
                              <div
                                className={`h-full ${isEnglish ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-yellow-500 to-yellow-600'}`}
                                style={{ width: `${lesson.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Lock className="w-4 h-4" />
                        <span>Complete previous chapters</span>
                      </div>
                    )}
                  </div>

                  {!lesson.locked && (
                    <div className="mt-4 flex items-center justify-end">
                      <ChevronRight className={`w-5 h-5 ${isEnglish ? 'text-purple-400 group-hover:text-purple-300' : 'text-yellow-400 group-hover:text-yellow-300'} transition-colors`} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={`bg-gradient-to-r ${isEnglish ? 'from-purple-600 to-pink-600' : 'from-yellow-500 to-yellow-600'} rounded-2xl p-8 text-white relative overflow-hidden group`}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
            <div className={`absolute inset-0 ${isEnglish ? 'bg-purple-500' : 'bg-yellow-500'} blur-xl`}></div>
          </div>
          <div className="relative flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center space-x-2">
                <Wand2 className="w-6 h-6" />
                <span>Begin Your Magical Journey</span>
              </h3>
              <p className={`${isEnglish ? 'text-purple-100' : 'text-yellow-100'}`}>Unlock the first chapter and harness the ancient powers within</p>
            </div>
            <button className={`${isEnglish ? 'bg-purple-100 text-purple-600 hover:bg-white' : 'bg-white text-yellow-600 hover:bg-yellow-100'} px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-xl hover:scale-105`}>
              Start Incantations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
