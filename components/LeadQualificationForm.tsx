'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  businessName: z.string().min(2, 'Business name is required'),
  businessType: z.string().min(1, 'Please select your business type'),
  needs: z.array(z.string()).min(1, 'Please select at least one option'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  projectDetails: z.string().min(10, 'Please describe your project (min 10 characters)'),
  source: z.string().min(1, 'Please tell us how you found us'),
})

type FormValues = z.infer<typeof schema>

const NEEDS_OPTIONS = [
  { value: 'landing-page', label: 'Landing Page' },
  { value: 'ecommerce', label: 'E-Commerce Store' },
  { value: 'ai-automation', label: 'AI Automation' },
  { value: 'full-rebrand', label: 'Full Rebrand' },
  { value: 'not-sure', label: 'Not Sure' },
]

interface LeadQualificationFormProps {
  className?: string
  onSuccess?: () => void
}

export function LeadQualificationForm({ className = '', onSuccess }: LeadQualificationFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { needs: [] },
  })

  const selectedNeeds = watch('needs') ?? []

  const toggleNeed = (value: string) => {
    const current = selectedNeeds
    if (current.includes(value)) {
      setValue('needs', current.filter((v) => v !== value), { shouldValidate: true })
    } else {
      setValue('needs', [...current, value], { shouldValidate: true })
    }
  }

  const onSubmit = async (data: FormValues) => {
    setServerError(null)
    try {
      const res = await fetch('/api/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error || 'Submission failed')
      }
      localStorage.setItem('userBooked', 'true')
      setSubmitted(true)
      onSuccess?.()
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-16 px-8 ${className}`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
          className="mx-auto mb-8 w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-green-400" />
        </motion.div>
        <h2 className="text-4xl font-light mb-4">You're on our radar</h2>
        <p className="text-xl text-gray-300 font-light mb-2">
          We'll contact you within 24 hours.
        </p>
        <p className="text-gray-500 font-light">
          Usually much faster.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-8 ${className}`} noValidate>
      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Name" error={errors.name?.message} required>
          <input
            {...register('name')}
            type="text"
            placeholder="Jane Smith"
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field label="Email" error={errors.email?.message} required>
          <input
            {...register('email')}
            type="email"
            placeholder="jane@company.com"
            className={inputClass(!!errors.email)}
          />
        </Field>
      </div>

      {/* Row 2: Business Name + Business Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Business Name" error={errors.businessName?.message} required>
          <input
            {...register('businessName')}
            type="text"
            placeholder="Acme Inc."
            className={inputClass(!!errors.businessName)}
          />
        </Field>
        <Field label="Business Type" error={errors.businessType?.message} required>
          <select {...register('businessType')} className={inputClass(!!errors.businessType)}>
            <option value="" className="bg-gray-900">Select type</option>
            <option value="E-Commerce" className="bg-gray-900">E-Commerce</option>
            <option value="Professional Services" className="bg-gray-900">Professional Services</option>
            <option value="Startup" className="bg-gray-900">Startup</option>
            <option value="Lifestyle/Brand" className="bg-gray-900">Lifestyle / Brand</option>
            <option value="Other" className="bg-gray-900">Other</option>
          </select>
        </Field>
      </div>

      {/* What do you need? */}
      <Field label="What do you need?" error={errors.needs?.message} required>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
          {NEEDS_OPTIONS.map((opt) => {
            const active = selectedNeeds.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleNeed(opt.value)}
                className={`px-4 py-3 rounded-xl text-sm font-light border-2 transition-all text-left ${
                  active
                    ? 'bg-purple-600/20 border-purple-500 text-white'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center transition-all ${
                    active ? 'bg-purple-600 border-purple-600' : 'border-white/30'
                  }`}>
                    {active && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {opt.label}
                </span>
              </button>
            )
          })}
        </div>
      </Field>

      {/* Row 3: Budget + Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Budget Range" error={errors.budget?.message} required>
          <select {...register('budget')} className={inputClass(!!errors.budget)}>
            <option value="" className="bg-gray-900">Select budget</option>
            <option value="Under R10k" className="bg-gray-900">Under R10k</option>
            <option value="R10k–R30k" className="bg-gray-900">R10k – R30k</option>
            <option value="R30k–R60k" className="bg-gray-900">R30k – R60k</option>
            <option value="R60k+" className="bg-gray-900">R60k+</option>
            <option value="Flexible" className="bg-gray-900">Flexible</option>
          </select>
        </Field>
        <Field label="Timeline" error={errors.timeline?.message} required>
          <select {...register('timeline')} className={inputClass(!!errors.timeline)}>
            <option value="" className="bg-gray-900">Select timeline</option>
            <option value="ASAP (< 2 weeks)" className="bg-gray-900">ASAP (&lt; 2 weeks)</option>
            <option value="1 month" className="bg-gray-900">1 month</option>
            <option value="2–3 months" className="bg-gray-900">2–3 months</option>
            <option value="Just exploring" className="bg-gray-900">Just exploring</option>
          </select>
        </Field>
      </div>

      {/* Project Details */}
      <Field label="Tell us about your project" error={errors.projectDetails?.message} required>
        <textarea
          {...register('projectDetails')}
          rows={5}
          placeholder="What are you building? What problem does it solve? Any specific requirements?"
          className={`${inputClass(!!errors.projectDetails)} resize-none`}
        />
      </Field>

      {/* How did you hear about us? */}
      <Field label="How did you hear about us?" error={errors.source?.message} required>
        <select {...register('source')} className={inputClass(!!errors.source)}>
          <option value="" className="bg-gray-900">Select source</option>
          <option value="LinkedIn" className="bg-gray-900">LinkedIn</option>
          <option value="Instagram" className="bg-gray-900">Instagram</option>
          <option value="Referral" className="bg-gray-900">Referral</option>
          <option value="Google" className="bg-gray-900">Google</option>
          <option value="Other" className="bg-gray-900">Other</option>
        </select>
      </Field>

      {/* Server error */}
      <AnimatePresence>
        {serverError && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-sm text-center"
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-5 rounded-2xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/30 hover:scale-[1.02]"
      >
        {isSubmitting ? 'Submitting...' : 'Get a Free Quote →'}
      </button>

      <p className="text-center text-sm text-gray-500 font-light">
        No spam. We'll reply within 24 hours — usually much faster.
      </p>
    </form>
  )
}

function inputClass(hasError: boolean) {
  return `w-full px-5 py-4 rounded-xl bg-white/5 border-2 transition-all text-base font-light placeholder:text-gray-600 focus:outline-none ${
    hasError
      ? 'border-red-500/60 focus:border-red-400'
      : 'border-white/10 focus:border-purple-500'
  }`
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-light text-gray-300">
        {label}
        {required && <span className="text-purple-400 ml-1">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-400 font-light"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
