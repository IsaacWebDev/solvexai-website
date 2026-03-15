'use client';

import { motion } from 'framer-motion';
import { Clock, Zap, Frown, X, DollarSign, Check, Target, Bot } from 'lucide-react';

const manualSteps = [
  { step: 1, task: 'Gather customer data', time: '10 min' },
  { step: 2, task: 'Copy to spreadsheet', time: '8 min' },
  { step: 3, task: 'Send follow-up email', time: '7 min' },
  { step: 4, task: 'Update CRM manually', time: '12 min' },
  { step: 5, task: 'Schedule next touchpoint', time: '8 min' },
];

export const WorkflowComparison = () => {
  return (
    <section className="py-32 px-6 flex justify-center">
      <div className="max-w-7xl w-full">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            Before vs. After
          </h2>
          <p className="text-xl text-gray-400">
            See the dramatic difference automation makes
          </p>
        </div>

        {/* Split Screen Comparison */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* LEFT: Manual Process */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-red-900/10 border border-red-500/30 rounded-3xl p-10"
          >
            <div className="text-center mb-8">
              <div className="text-red-400 text-sm uppercase tracking-wider mb-2">
                Without SolveXAI
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Manual Process
              </h3>
              <p className="text-red-400 text-lg flex items-center justify-center gap-2">
                <Clock size={20} /> Total: <span className="font-bold text-2xl">45 minutes</span>
              </p>
            </div>

            <div className="space-y-4">
              {manualSteps.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-white">{item.task}</p>
                  </div>
                  <div className="text-red-400 font-semibold text-sm">
                    {item.time}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm flex items-center justify-center gap-3">
                <span className="flex items-center gap-1"><Frown size={16} /> Tedious</span>
                <span className="flex items-center gap-1"><X size={16} /> Error-prone</span>
                <span className="flex items-center gap-1"><DollarSign size={16} /> Expensive</span>
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Automated with SolveXAI */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-green-900/10 border border-green-500/30 rounded-3xl p-10"
          >
            <div className="text-center mb-8">
              <div className="text-green-400 text-sm uppercase tracking-wider mb-2">
                With SolveXAI
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Automated Workflow
              </h3>
              <p className="text-green-400 text-lg flex items-center justify-center gap-2">
                <Zap size={20} /> Total: <span className="font-bold text-2xl">30 seconds</span>
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-500/50 rounded-xl p-12 flex flex-col items-center justify-center min-h-[340px]"
            >
              <div className="mb-6">
                <Bot size={80} className="text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-4">
                1 Click
              </p>
              <p className="text-gray-400 text-center">
                Everything happens automatically:<br />
                Data captured, emails sent, CRM updated,<br />
                follow-ups scheduled
              </p>
            </motion.div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm flex items-center justify-center gap-3">
                <span className="flex items-center gap-1"><Zap size={16} /> Instant</span>
                <span className="flex items-center gap-1"><Check size={16} /> Accurate</span>
                <span className="flex items-center gap-1"><Target size={16} /> Consistent</span>
              </p>
            </div>
          </motion.div>

        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl px-12 py-6">
            <p className="text-gray-400 mb-2">Time Saved Per Task</p>
            <p className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              98.9%
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
