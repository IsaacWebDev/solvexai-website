import { CheckCircle, LucideIcon } from 'lucide-react'

interface Feature {
  title: string
  description?: string
  icon?: LucideIcon
}

interface FeatureListProps {
  features: Feature[]
  iconColor?: string
  iconSize?: string
}

/**
 * Reusable FeatureList component
 * Displays a list of features with icons and descriptions
 * Reduces duplication in pricing and comparison sections
 */
export function FeatureList({ 
  features, 
  iconColor = 'text-green-400',
  iconSize = 'w-5 h-5'
}: FeatureListProps) {
  return (
    <ul className="space-y-4" role="list">
      {features.map((feature, index) => {
        const Icon = feature.icon || CheckCircle
        return (
          <li key={index} className="flex items-start gap-3">
            <Icon 
              className={`${iconSize} ${iconColor} mt-1 flex-shrink-0`} 
              aria-hidden="true"
            />
            <div>
              <div className="font-medium text-gray-200">{feature.title}</div>
              {feature.description && (
                <div className="text-sm text-gray-400 mt-1">{feature.description}</div>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
