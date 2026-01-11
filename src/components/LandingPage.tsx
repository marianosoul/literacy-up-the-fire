import { BookOpen, Calculator, Star, Trophy, Target, Zap, Sparkles, Wand2 } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onSubjectSelect: (subject: 'english' | 'math') => void;
}

function LandingPage({ onSubjectSelect }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <nav className="bg-gray-900/40 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-purple-600 to-yellow-500 p-2 rounded-lg animate-pulse">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-yellow-300 bg-clip-text text-transparent">
                Lit(eracy) up the Fire
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-purple-200 hover:text-yellow-300 transition-colors">Features</a>
              <a href="#subjects" className="text-purple-200 hover:text-yellow-300 transition-colors">Subjects</a>
              <a href="#how-it-works" className="text-purple-200 hover:text-yellow-300 transition-colors">How It Works</a>
              <button className="bg-gradient-to-r from-purple-600 to-yellow-500 text-white px-6 py-2 rounded-lg hover:shadow-xl hover:shadow-yellow-500/50 transition-all">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-purple-500/30 backdrop-blur-sm border border-purple-400/50 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Unlock the Magic of Learning</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Master English & Math
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 bg-clip-text text-transparent">
              With Ancient Magic
            </span>
          </h1>
          <p className="text-xl text-purple-200 mb-12 leading-relaxed">
            A mystical learning platform where ancient knowledge meets modern education. Harness the power
            of sorcery to master English and Mathematics with enchanting lessons and magical achievements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onSubjectSelect('english')}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all border border-purple-400/50"
            >
              Enchant English
            </button>
            <button
              onClick={() => onSubjectSelect('math')}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 transition-all border border-yellow-400/50"
            >
              Master Mathcraft
            </button>
          </div>
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Lit(eracy) up the Fire?</h2>
          <p className="text-lg text-purple-300">Harness the ancient powers of knowledge and magic</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all border border-purple-500/30 hover:border-purple-400/60 group">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Mystical Foundations</h3>
            <p className="text-purple-200 leading-relaxed">
              Begin with ancient wisdom and clear guidance, designed for seekers of all magical abilities.
            </p>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:shadow-yellow-500/30 transition-all border border-purple-500/30 hover:border-yellow-400/60 group">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Trophy className="w-7 h-7 text-gray-900" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Arcane Achievements</h3>
            <p className="text-purple-200 leading-relaxed">
              Collect runes of power and mystical achievements as you progress through your magical journey.
            </p>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all border border-purple-500/30 hover:border-purple-400/60 group">
            <div className="bg-gradient-to-br from-pink-600 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Enchanted Learning</h3>
            <p className="text-purple-200 leading-relaxed">
              Experience interactive spells and magical challenges that strengthen your understanding.
            </p>
          </div>
        </div>
      </section>

      <section id="subjects" className="bg-gradient-to-br from-gray-800 via-purple-900 to-gray-800 py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Arcane Path</h2>
            <p className="text-lg text-purple-300">Select your school of sorcery and begin your magical journey</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <button
              onClick={() => onSubjectSelect('english')}
              className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm p-10 rounded-2xl shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all text-left group border border-purple-500/30 hover:border-purple-400/60"
            >
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:shadow-purple-500/50">
                <BookOpen className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Enchanted English</h3>
              <p className="text-purple-200 leading-relaxed mb-6">
                Master the ancient language of words, from mystical alphabets to powerful prose that bends reality.
              </p>
              <ul className="space-y-2 text-purple-100">
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Runes of Alphabet</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Incantations & Vocabulary</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Spellbound Reading</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Enchanted Writing</span>
                </li>
              </ul>
            </button>

            <button
              onClick={() => onSubjectSelect('math')}
              className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/30 backdrop-blur-sm p-10 rounded-2xl shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 transition-all text-left group border border-yellow-500/30 hover:border-yellow-400/60"
            >
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:shadow-yellow-500/50">
                <Calculator className="w-9 h-9 text-gray-900" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Mathcraft Mastery</h3>
              <p className="text-purple-200 leading-relaxed mb-6">
                Harness the universal forces of numbers and logic to unlock the secrets of the magical realm.
              </p>
              <ul className="space-y-2 text-purple-100">
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Mystical Numbers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Sacred Operations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Fractional Alchemy</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Geometric Sorcery</span>
                </li>
              </ul>
            </button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Your Path to Magical Mastery</h2>
          <p className="text-lg text-purple-300">Three sacred steps to unlock your potential</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl shadow-purple-500/50">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Summon Your School</h3>
            <p className="text-purple-300">Choose between Enchanted English or Mathcraft to begin your sorcerous studies.</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-gray-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl shadow-yellow-500/50">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Cast Your Spells</h3>
            <p className="text-purple-300">Master enchanted lessons with interactive magical challenges and instant mystical feedback.</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-pink-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl shadow-purple-500/50">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Ascend in Power</h3>
            <p className="text-purple-300">Track your mystical progress, collect arcane runes, and master ancient knowledge at your pace.</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-purple-500/20 text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-purple-600 to-yellow-500 p-2 rounded-lg animate-pulse">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-yellow-300 bg-clip-text text-transparent">
                Lit(eracy) up the Fire
              </span>
            </div>
            <div className="text-purple-300 text-sm">
              © 2026 Lit(eracy) up the Fire. Unleashing the magic within every learner.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
