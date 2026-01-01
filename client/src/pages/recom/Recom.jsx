import React from 'react'
import { RecommendationEndpoint, TrendingEndpoint } from '../../api/endpoint/movie'
import { useQuery } from '@tanstack/react-query'

export const Recom = () => {

  const { data: trendingData = [] } = useQuery({
    queryKey: ['get-trending'],
    queryFn: () => TrendingEndpoint()
  })


  const { data: recommendationData = [] } = useQuery({
    queryKey: ['get-recom'],
    queryFn: () => RecommendationEndpoint()
  })

  const trending = trendingData.trending || []
  const recom = recommendationData.recommendation || []

  return (
    <section>

      <h1> Trending </h1>

      {trending?.map((trend) => (
        <div key={trend._id}>
          <h1> {trend.title} </h1>
        </div>
      ))}

      <h1> Recommendations </h1>

      {recom?.map((recom) => (
        <div key={recom._id}>
          <h1> {recom.title} </h1>
        </div>
      ))}

    </section>
  )
}
